import firestore from '@react-native-firebase/firestore';

import { UserType } from '@/types';

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
