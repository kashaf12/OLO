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
