import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

import { UserType } from '@/store/userInfo';
import { getFileExtension } from '@/utils';

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // 1 second

const USER_COLLECTION = 'User';

export const getUserInfo = async (userId: string, retryCount = 0): Promise<UserType | null> => {
  try {
    const userDoc = await firestore().collection(USER_COLLECTION).doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data() as UserType;
    } else {
      if (retryCount < MAX_RETRIES) {
        console.log(`User not found, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return getUserInfo(userId, retryCount + 1);
      } else {
        console.error('Max retries reached. User not found.');
        return null;
      }
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const updateUserInfo = async (userId: string, updates: Partial<UserType>): Promise<void> => {
  try {
    await firestore()
      .collection(USER_COLLECTION)
      .doc(userId)
      .update({
        ...updates,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

export const listenToUserChanges = (
  userId: string,
  onUpdate: (user: UserType) => void,
  onError: (error: Error) => void
) => {
  const unsubscribe = firestore()
    .collection(USER_COLLECTION)
    .doc(userId)
    .onSnapshot(
      (doc) => {
        if (doc.exists) {
          const userData = doc.data() as UserType;
          onUpdate(userData);
        } else {
          onError(new Error('User document does not exist'));
        }
      },
      (error) => {
        onError(error);
      }
    );

  return unsubscribe;
};

export const uploadProfilePhoto = async (userId: string, uri: string): Promise<string> => {
  try {
    const extension = getFileExtension(uri);
    if (!extension) {
      console.error('Error uploading profile photo: No extension found');
      throw new Error('Error uploading profile photo: No extension found');
    }

    const filename = `profile_photos/${userId}/profile_photo`;
    const reference = storage().ref(filename);

    if (Platform.OS === 'ios') {
      await reference.putFile(uri);
    } else {
      const response = await fetch(uri);
      const blob = await response.blob();
      await reference.put(blob);
    }

    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    throw new Error('Failed to upload profile photo');
  }
};

export const getProfilePhotoUrls = async (userId: string): Promise<(string | null)[]> =>
  Promise.all([getProfilePhotoThumbnail(userId), getProfilePhotoOriginal(userId)]);

export const getProfilePhotoThumbnail = async (userId: string): Promise<string | null> => {
  try {
    const filename = `profile_photos/${userId}/profile_photo_200x200`;
    const reference = storage().ref(filename);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Error getting thumbnail profile photo URL:', error);
    return null;
  }
};

export const getProfilePhotoOriginal = async (userId: string): Promise<string | null> => {
  try {
    const filename = `profile_photos/${userId}/profile_photo`;
    const reference = storage().ref(filename);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Error getting original profile photo URL:', error);
    return null;
  }
};
