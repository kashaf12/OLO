import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

const logger = functions.logger;

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();
const usersCollection = db.collection('User');

export const createUserDocumentOnSignUp = functions.auth.user().onCreate(async (user) => {
  logger.info('Starting Create User Document flow', { userId: user.uid });

  // Reference to the new user document
  const userDocumentRef = usersCollection.doc(user.uid);

  // Prepare user data
  const userData = {
    displayName: user.displayName || 'OLO_USER',
    email: user.email || null,
    phoneNumber: user.phoneNumber || null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    lastLoginAt: FieldValue.serverTimestamp(),
    isActive: true,
    stats: {
      totalAds: 0,
      activeAds: 0,
      totalSales: 0,
      totalPurchases: 0,
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
