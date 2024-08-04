import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

import { UserType } from '@/store/userInfo';

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // 1 second

export const getUserInfo = async (userId: string, retryCount = 0): Promise<UserType | null> => {
  try {
    const userDoc = await firestore().collection('User').doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data() as UserType;
    } else {
      if (retryCount < MAX_RETRIES) {
        console.log(`User not found, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return getUserInfo(userId, retryCount + 1);
      } else {
        console.log('Max retries reached. User not found.');
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
      .collection('User')
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
    .collection('User')
    .doc(userId)
    .onSnapshot(
      (doc) => {
        console.log('onSnapshot', doc);
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
    const filename = `profile_photos/${userId}/profile_photo.jpg`;
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

export const getProfilePhotoUrl = async (userId: string): Promise<string | null> => {
  try {
    const filename = `profile_photos/${userId}/profile_photo.jpg`;
    const reference = storage().ref(filename);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Error getting profile photo URL:', error);
    return null;
  }
};
