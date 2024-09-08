import { File } from '@google-cloud/storage';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as os from 'os';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import { config } from './config';
import { shouldResize } from './filters';
import { modifyImage, ResizedImageResult } from './resize-image';
import { startsWithArray } from './util';

sharp.cache(false);

const logger = functions.logger;

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();
const usersCollection = db.collection('User');

/**
 * Cloud Function triggered on user creation.
 * Creates a new user document in Firestore with initial data.
 *
 * @param {functions.auth.UserRecord} user - The user record of the newly created user
 * @returns {Promise<void>}
 */
export const createUserDocumentOnSignUp = functions.auth.user().onCreate(async (user) => {
  logger.info('Starting Create User Document flow', { userId: user.uid });

  // Reference to the new user document
  const userDocumentRef = usersCollection.doc(user.uid);

  // Prepare user data
  const userData = {
    displayName: user.displayName || 'NOT_FOUND',
    email: user.email || null,
    phoneNumber: user.phoneNumber || null,
    lastLoginAt: FieldValue.serverTimestamp(),
    isActive: true,
    stats: {
      totalAds: 0,
      activeAds: 0,
      rating: -1,
    },
    // Add any other initial fields here
  };

  // Log the user data being set (exclude sensitive info)
  logger.info('User data prepared', {
    userId: user.uid,
    displayName: userData.displayName,
    isActive: userData.isActive,
  });

  // Set the user document in Firestore
  return userDocumentRef.set(userData);
});

/**
 * Cloud Function triggered on file upload to generate resized JPEG images.
 *
 * @param {functions.storage.ObjectMetadata} object - Metadata of the uploaded file
 * @returns {Promise<void>}
 */
export const generateResizedJpegOnUpload = functions.storage.object().onFinalize(async (object) => {
  logger.log('Started execution of extension with configuration', config);

  if (!object.name) {
    logger.log('Object name is undefined, exiting function');
    return;
  }

  if (!shouldResize(object)) {
    logger.log('Object does not meet resize criteria, exiting function');
    return;
  }

  const bucket = admin.storage().bucket(object.bucket);
  const filePath = object.name; // File path in the bucket.
  const parsedPath = path.parse(filePath);
  const objectMetadata = object;

  logger.log(`Processing file: ${filePath}`);
  logger.log(`Parsed path:`, parsedPath);

  let localOriginalFile: string | undefined;
  let remoteOriginalFile: File;
  try {
    localOriginalFile = path.join(os.tmpdir(), uuidv4());
    const tempLocalDir = path.dirname(localOriginalFile);

    // Create the temp directory where the storage file will be downloaded.
    logger.log(`Creating temporary directory: '${tempLocalDir}'`);
    await mkdirp(tempLocalDir);
    logger.log(`Created temporary directory: '${tempLocalDir}'`);

    // Download file from bucket.
    remoteOriginalFile = bucket.file(filePath);
    logger.log(`Downloading image file: '${filePath}'`);
    await remoteOriginalFile.download({ destination: localOriginalFile });
    logger.log(`Downloaded image file: '${filePath}' to '${localOriginalFile}'`);

    logger.log(`Image type to process:`, config.defaultImageFormat);

    const tasks: Promise<ResizedImageResult>[] = [];

    config.imagePathAndSizeMapping
      .filter(({ path: filePath }) => {
        if (!object.name) return false;
        return startsWithArray([filePath], path.resolve('/', path.dirname(object.name)));
      })
      .forEach(({ path: filePath, sizes }) => {
        logger.log(`Image path:`, filePath);
        // Convert to a set to remove any duplicate sizes
        const imageSizes = new Set(sizes);
        logger.log(`Image sizes to generate:`, Array.from(imageSizes));
        sizes.forEach((size) => {
          logger.log(`Queueing task for format: ${config.defaultImageFormat}, size: ${size}`);
          tasks.push(
            modifyImage({
              bucket,
              originalFile: localOriginalFile as string,
              parsedPath,
              contentType: object.contentType as string,
              size,
              objectMetadata,
              format: config.defaultImageFormat,
            })
          );
        });
      });

    logger.log(`Starting ${tasks.length} resize tasks`);
    const results = await Promise.all(tasks);
    logger.log(`Completed ${tasks.length} resize tasks`);

    const failed = results.some((result) => result.success === false);
    if (failed) {
      logger.error('Failed execution of extension', { results });
    } else {
      logger.log('Completed execution of extension successfully', { results });
    }
  } catch (err) {
    logger.error('Error when resizing image', err);
  } finally {
    if (localOriginalFile) {
      logger.log(`Deleting temporary original file: '${localOriginalFile}'`);
      try {
        fs.unlinkSync(localOriginalFile);
        logger.log(`Deleted temporary original file: '${localOriginalFile}'`);
      } catch (err) {
        logger.warn('Error when deleting temporary file', err);
      }
    }
  }

  logger.log('Finished execution of generateResizedJpegOnUpload');
});

/**
 * Cloud Function triggered when a new ad is created in Firestore.
 * This function performs multiple operations:
 * 1. Increments the user's total ad count and updates last posted ad timestamp
 * 2. Initially marks the new ad as "pending"
 * 3. Analyzes ad images using Vertex AI
 * 4. Based on analysis results, either marks the ad as "active" or "rejected"
 * 5. If marked as active, increments the user's active ad count
 *
 * @param {functions.firestore.DocumentSnapshot} snap - The snapshot of the newly created ad document
 * @param {functions.EventContext} context - The event context
 * @throws {Error} If the user document doesn't exist or if there's an error in processing
 */
export const processNewAd = functions.firestore
  .document('Ads/{adId}')
  .onCreate(async (snap, context) => {
    const newAd = snap.data();
    const adId = context.params.adId;
    const userId = newAd.userId;

    logger.info(`Initiating processing for new ad ${adId} created by user ${userId}`);

    const db = admin.firestore();
    const userRef = db.collection('User').doc(userId);
    const adRef = db.collection('Ads').doc(adId);

    try {
      await db.runTransaction(async (transaction) => {
        logger.debug(`Starting initial transaction for ad ${adId}`);

        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists) {
          throw new Error(`User document not found for userId: ${userId}`);
        }

        const currentStats = userDoc.data()?.stats || {};
        const newTotalAds = (currentStats.totalAds || 0) + 1;

        transaction.update(userRef, {
          'stats.totalAds': newTotalAds,
          'stats.lastPostedAd': FieldValue.serverTimestamp(),
        });
        logger.info(`Updated user ${userId} stats: totalAds=${newTotalAds}`);

        transaction.update(adRef, {
          status: 'pending',
          message: 'Ad is pending review',
          updatedAt: FieldValue.serverTimestamp(),
        });
        logger.debug(`Marked ad ${adId} as pending for review`);
      });

      logger.info(`Starting Vertex AI analysis for ad ${adId}`);
      const imageAnalysisResults = await analyzeImagesWithVertexAI();
      logger.debug(
        `Vertex AI analysis completed for ad ${adId}: ${JSON.stringify(imageAnalysisResults)}`
      );

      await db.runTransaction(async (transaction) => {
        logger.debug(`Starting post-analysis transaction for ad ${adId}`);

        if (!imageAnalysisResults.success) {
          transaction.update(adRef, {
            status: 'rejected',
            message: 'Ad rejected due to content policy violation',
            aiAnalysisResults: imageAnalysisResults,
            updatedAt: FieldValue.serverTimestamp(),
          });
          logger.warn(`Ad ${adId} rejected due to failed image analysis`);
          return;
        }

        const userDoc = await transaction.get(userRef);
        const currentStats = userDoc.data()?.stats || {};
        const newActiveAds = (currentStats.activeAds || 0) + 1;

        transaction.update(userRef, {
          'stats.activeAds': newActiveAds,
        });
        logger.info(`Updated user ${userId} stats: activeAds=${newActiveAds}`);

        transaction.update(adRef, {
          status: 'active',
          message: 'Ad successfully published',
          aiAnalysisResults: imageAnalysisResults,
          updatedAt: FieldValue.serverTimestamp(),
        });
        logger.info(`Ad ${adId} marked as active with AI analysis results`);
      });

      logger.info(`Successfully completed processing for ad ${adId}`);
    } catch (error) {
      logger.error(`Error occurred while processing ad ${adId}:`, error);
      if (error instanceof Error) {
        await adRef.update({
          status: 'rejected',
          message: `Ad processing failed: ${error.message}`,
          updatedAt: FieldValue.serverTimestamp(),
        });
        logger.warn(`Updated ad ${adId} status to 'rejected' due to error: ${error.message}`);
      }
    }
  });

/**
 * Analyzes an array of image URLs using Vertex AI.
 * This is a placeholder function and should be replaced with actual Vertex AI implementation.
 *
 * @param {string[]} images - Array of image URLs to analyze
 * @returns {Promise<{success: boolean, message: string, [key: string]: any}>} The analysis results from Vertex AI
 */
async function analyzeImagesWithVertexAI(): Promise<{
  success: boolean;
  message: string;
  [key: string]: any;
}> {
  logger.debug(`Initiating Vertex AI analysis`);

  // Simulating analysis delay and process
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Placeholder return value - replace with actual Vertex AI logic
  return {
    success: true,
    message: 'Image analysis completed successfully',
    contentSafe: true,
    // Add more fields based on your actual Vertex AI implementation
  };
}

/**
 * Cloud Function to handle ad deletion, including related image removal and user stats update.
 *
 * This function is triggered when a document in the 'Ads' collection is deleted.
 * It performs the following tasks:
 * 1. Deletes all images associated with the ad from Firebase Storage.
 * 2. Decrements the totalAds count in the user's document in Firestore.
 *
 * @param {functions.firestore.QueryDocumentSnapshot} snapshot - The snapshot of the deleted document
 * @param {functions.EventContext} context - The event context
 */
export const deleteAd = functions.firestore
  .document('Ads/{adId}')
  .onDelete(async (snapshot, context) => {
    const adId = context.params.adId;
    const adData = snapshot.data();

    if (!adData) {
      logger.warn(`No data found for ad ${adId}`);
      return;
    }

    const userId = adData.userId;
    logger.info(`Processing deletion for ad ${adId} of user ${userId}`);

    try {
      await deleteAdImages(adId, adData.images);
      await decrementUserTotalAds(userId);

      logger.info(`Successfully processed deletion for ad ${adId}`);
    } catch (error) {
      logger.error(`Error processing deletion for ad ${adId}:`, error);
    }
  });

/**
 * Deletes all images and their variations associated with an ad from Firebase Storage.
 *
 * @param {string} adId - The ID of the ad
 * @param {Array<{id: string}>} images - Array of image objects containing image IDs
 */
async function deleteAdImages(adId: string, images: { id: string }[]) {
  if (!images || !Array.isArray(images)) {
    logger.warn(`No images to delete for ad ${adId}`);
    return;
  }

  const deletePromises = images.flatMap(async (image) => {
    const variations = [
      `ads/${adId}/${image.id}`,
      `ads/${adId}/${image.id}_1200x1200`,
      `ads/${adId}/${image.id}_300x300`,
    ];

    return variations.map(async (imagePath) => {
      try {
        await admin.storage().bucket().file(imagePath).delete();
        logger.info(`Deleted image variation: ${imagePath}`);
      } catch (error) {
        // If the file doesn't exist, it's not an error we need to throw
        if ((error as { code: number }).code === 404) {
          logger.warn(`Image variation not found (already deleted or never existed): ${imagePath}`);
        } else {
          logger.error(`Error deleting image variation ${imagePath}:`, error);
        }
      }
    });
  });

  await Promise.all(deletePromises.flat());
  logger.info(`Finished deleting all image variations for ad ${adId}`);
}
/**
 * Decrements the totalAds count in the user's document in Firestore.
 *
 * @param {string} userId - The ID of the user
 */
async function decrementUserTotalAds(userId: string) {
  const userRef = db.collection('User').doc(userId);

  try {
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error('User document does not exist');
      }
      const userData = userDoc.data();
      if (!userData) {
        throw new Error('User data is undefined');
      }
      const currentTotalAds = userData.stats?.totalAds || 0;
      transaction.update(userRef, {
        'stats.totalAds': Math.max(currentTotalAds - 1, 0),
      });
    });
    logger.info(`Decremented totalAds for user ${userId}`);
  } catch (error) {
    logger.error(`Error decrementing totalAds for user ${userId}:`, error);
    throw error; // Re-throw to be caught by the main try-catch block
  }
}
