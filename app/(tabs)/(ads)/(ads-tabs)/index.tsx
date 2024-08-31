import { Href, useRouter } from 'expo-router';
import React from 'react';

import { TAB_SCREENS } from '@/constants';
import { useUserAds } from '@/hooks';
import { MainAds } from '@/screens';

const Page = () => {
  const router = useRouter();
  const { ads } = useUserAds();

  return (
    <MainAds
      refetch={console.log}
      onPressStartSelling={() => router.replace(TAB_SCREENS.SELL as Href<string>)}
      userListedAds={ads}
    />
  );
};

export default Page;
