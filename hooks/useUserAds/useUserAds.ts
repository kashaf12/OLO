import { useCallback, useEffect } from 'react';

import {
  changeAdStatus,
  createAd,
  deleteAd,
  getAdById,
  getUserAds,
  listenToUserAds,
  updateAd,
  updateAdLocation,
  getAdImageUrl,
  createAdWithImages,
} from '@/services';
import { useAuthStore, useUserAdsStore } from '@/store';
import { AdType, ImageType, LocationType } from '@/store/userAds';

export const useInitializeUserAds = () => {
  const { user } = useAuthStore();
  const { setAds, setIsLoading, setError } = useUserAdsStore();

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initializeUserAds = async () => {
      if (user) {
        setIsLoading(true);
        try {
          unsubscribe = listenToUserAds(user.uid, (updatedAds) => {
            setAds(updatedAds);
            setIsLoading(false);
          });
        } catch (error) {
          console.error('Error initializing user ads:', error);
          setError(error instanceof Error ? error.message : 'Unknown error occurred');
        } finally {
          setIsLoading(false);
        }
      } else {
        setAds([]);
      }
    };

    initializeUserAds();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, setAds, setIsLoading, setError]);
};

export const useUserAds = () => {
  const { user } = useAuthStore();
  const { ads, isLoading, error, setAds, setIsLoading, setError } = useUserAdsStore();

  const fetchUserAds = useCallback(async () => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setIsLoading(true);
    try {
      const fetchedAds = await getUserAds(user.uid);
      setAds(fetchedAds);
      return fetchedAds;
    } catch (error) {
      console.error('Error fetching user ads:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch user ads');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, setAds, setIsLoading, setError]);

  const createUserAd = useCallback(
    async (adData: Omit<AdType, 'createdAt' | 'updatedAt'>) => {
      if (!user) {
        throw new Error('No authenticated user');
      }

      setIsLoading(true);
      try {
        const adId = await createAd(user.uid, adData);
        const newAd = await getAdById(adId);
        if (newAd) {
          setAds([newAd, ...ads]);
        }
        return adId;
      } catch (error) {
        console.error('Error creating ad:', error);
        setError(error instanceof Error ? error.message : 'Failed to create ad');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user, ads, setAds, setIsLoading, setError]
  );

  const updateUserAd = useCallback(
    async (adId: string, adData: Partial<AdType>) => {
      setIsLoading(true);
      try {
        await updateAd(adId, adData);
        const updatedAds = ads.map((ad) => (ad.id === adId ? { ...ad, ...adData } : ad));
        setAds(updatedAds);
      } catch (error) {
        console.error('Error updating ad:', error);
        setError(error instanceof Error ? error.message : 'Failed to update ad');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setAds, ads, setIsLoading, setError]
  );

  const deleteUserAd = useCallback(
    async (adId: string) => {
      setIsLoading(true);
      try {
        await deleteAd(adId);
        const updatedAds = ads.filter((ad) => ad.id !== adId);
        setAds(updatedAds);
      } catch (error) {
        console.error('Error deleting ad:', error);
        setError(error instanceof Error ? error.message : 'Failed to delete ad');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setAds, setIsLoading, setError]
  );

  const updateUserAdLocation = useCallback(
    async (adId: string, location: LocationType) => {
      setIsLoading(true);
      try {
        await updateAdLocation(adId, location);
        const updatedAds = ads.map((ad) => (ad.id === adId ? { ...ad, location } : ad));
        setAds(updatedAds);
      } catch (error) {
        console.error('Error updating ad location:', error);
        setError(error instanceof Error ? error.message : 'Failed to update ad location');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setAds, setIsLoading, setError, ads]
  );

  const changeUserAdStatus = useCallback(
    async (adId: string, status: AdType['status']) => {
      setIsLoading(true);
      try {
        await changeAdStatus(adId, status);
        const updatedAds = ads.map((ad) => (ad.id === adId ? { ...ad, status } : ad));
        setAds(updatedAds);
      } catch (error) {
        console.error('Error changing ad status:', error);
        setError(error instanceof Error ? error.message : 'Failed to change ad status');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setAds, setIsLoading, setError, ads]
  );

  const createUserAdWithImage = useCallback(
    async (
      images: (Pick<ImageType, 'id' | 'name'> & { path: string })[],
      adData: Omit<
        AdType,
        'status' | 'createdAt' | 'updatedAt' | 'id' | 'likesCount' | 'views' | 'images'
      >
    ) => {
      if (!user) {
        throw new Error('No authenticated user');
      }
      setIsLoading(true);
      try {
        return createAdWithImages(user.uid, adData, images);
      } catch (error) {
        console.error('Error creating ad with images:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to create ad and upload ad images'
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user, setIsLoading, setError]
  );

  const getUserAdUrl = useCallback((path: string) => {
    return getAdImageUrl(path);
  }, []);

  return {
    ads,
    isLoading,
    error,
    fetchUserAds,
    createUserAd,
    updateUserAd,
    deleteUserAd,
    updateUserAdLocation,
    changeUserAdStatus,
    createUserAdWithImage,
    getUserAdUrl,
  };
};

export default useUserAds;
