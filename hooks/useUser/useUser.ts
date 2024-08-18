import { useEffect, useCallback } from 'react';

import {
  getUserInfo,
  getProfilePhotoUrl,
  listenToUserChanges,
  updateUserInfo,
  uploadProfilePhoto,
} from '@/services';
import { useAuthStore, useUserInfoStore } from '@/store';
import { UserType } from '@/store/userInfo';

export const useInitializeUser = () => {
  const { setUserInfo, setIsLoading } = useUserInfoStore();
  const { user } = useAuthStore();

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initializeUser = async () => {
      if (user) {
        setIsLoading(true);
        try {
          unsubscribe = listenToUserChanges(
            user.uid,
            (updatedUser) => {
              setUserInfo(updatedUser);
            },
            (error) => {
              console.error('Error in user listener:', error);
            }
          );
        } catch (error) {
          console.error('Error initializing user:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserInfo(null);
      }
    };

    initializeUser();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, setUserInfo, setIsLoading]);
};
export const useUser = () => {
  const { userInfo, setUserInfo, setIsLoading } = useUserInfoStore();
  const { user } = useAuthStore();

  const getUser = useCallback(async () => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setIsLoading(true);
    try {
      const fetchedUser = await getUserInfo(user.uid);
      if (fetchedUser) {
        setUserInfo(fetchedUser);
      }
      return fetchedUser;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, setUserInfo, setIsLoading]);

  const updateUser = useCallback(
    async (updates: Partial<UserType>) => {
      if (!user) {
        throw new Error('No authenticated user');
      }

      setIsLoading(true);
      try {
        await updateUserInfo(user.uid, updates);
        const updatedUser = await getUser();
        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user, getUser, setIsLoading]
  );

  const uploadProfileImage = useCallback(
    async (imageUri: string | null) => {
      if (!user) {
        throw new Error('No authenticated user');
      }

      try {
        let downloadURL = null;
        if (imageUri) {
          downloadURL = await uploadProfilePhoto(user.uid, imageUri);
        }
        await updateUser({ profilePhotoUrl: downloadURL });
        return downloadURL;
      } catch (error) {
        console.error('Error uploading profile image:', error);
        throw new Error('Failed to upload profile image');
      }
    },
    [user, updateUser]
  );

  const getProfileImage = useCallback(async () => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    try {
      const photoUrl = await getProfilePhotoUrl(user.uid);
      return photoUrl;
    } catch (error) {
      console.error('Error getting profile image:', error);
      return null;
    }
  }, [user]);

  return {
    user: userInfo,
    getUser,
    updateUser,
    uploadProfileImage,
    getProfileImage,
  };
};
