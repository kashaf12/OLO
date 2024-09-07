import { Href, useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { TAB_SCREENS } from '@/constants';
import { useUserAds } from '@/hooks';
import { MainAds } from '@/screens';

const Page = () => {
  const router = useRouter();
  const { ads, fetchUserAds, isLoading } = useUserAds();

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

  return (
    <>
      <MainAds
        refetch={onRefresh}
        onPressStartSelling={() => router.replace(TAB_SCREENS.SELL as Href<string>)}
        userListedAds={ads}
        isLoadingAds={isLoading}
      />
    </>
  );
};

export default Page;
