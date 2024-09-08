import firestore from '@react-native-firebase/firestore';
import { Href, useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { TAB_SCREENS } from '@/constants';
import { useUser, useUserAds } from '@/hooks';
import { MainAds } from '@/screens';
import { StatusType } from '@/store/ads';

const Page = () => {
  const router = useRouter();
  const { ads, fetchUserAds, isLoading, changeUserAdStatus, deleteUserAd, updateUserAd } =
    useUserAds();
  const { updateUser, user } = useUser();

  const loadAds = useCallback(async () => {
    try {
      await fetchUserAds();
    } catch (error) {
      console.error('Error fetching ads:', error);
      // You might want to show an error message to the user here
    }
  }, [fetchUserAds]);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  const onRefresh = useCallback(async () => {
    await loadAds();
  }, [loadAds]);

  const handleStatusChange = useCallback(async (adId: string, status: StatusType) => {
    if (status === 'deactivated') {
      updateUser({
        stats: {
          rating: -1,
          totalAds: 0,
          totalPurchases: 0,
          totalSales: 0,
          ...user?.stats,
          activeAds: Math.max((user?.stats?.activeAds || 0) - 1, 0),
        },
      });
      updateUserAd(adId, {
        endingAt: firestore.FieldValue.serverTimestamp(),
        status,
      });
    } else if (status === 'active') {
      updateUser({
        stats: {
          rating: -1,
          totalAds: 0,
          totalPurchases: 0,
          totalSales: 0,
          ...user?.stats,
          activeAds: Math.max((user?.stats?.activeAds || 0) + 1, 0),
        },
      });

      changeUserAdStatus(adId, status);
    } else if (status === 'sold') {
      updateUserAd(adId, {
        endingAt: firestore.FieldValue.serverTimestamp(),
        status,
      });
    } else {
      changeUserAdStatus(adId, status);
    }
  }, []);

  return (
    <>
      <MainAds
        refetch={onRefresh}
        onPressStartSelling={() => router.replace(TAB_SCREENS.SELL as Href<string>)}
        userListedAds={ads}
        isLoadingAds={isLoading}
        onChangeStatus={handleStatusChange}
        onDeleteAd={deleteUserAd}
      />
    </>
  );
};

export default Page;
