import { Href, useRouter } from 'expo-router';
import React from 'react';

import { ACCOUNT_SCREENS, BASE_SCREENS } from '@/constants';
import { useAuth } from '@/hooks';
import { MainAccount } from '@/screens';
import { useUserInfoStore } from '@/store';

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, setAuthSkipped } = useAuth();
  const isLoading = useUserInfoStore((state) => state.isLoading);
  const user = useUserInfoStore((state) => state.userInfo);

  const handleOnPressLogin = () => {
    if (!isAuthenticated) {
      setAuthSkipped(false);
      router.push(BASE_SCREENS.AUTHENTICATION as Href);
    }
  };

  return (
    <MainAccount
      onPressHelp={() => router.navigate(ACCOUNT_SCREENS.HELP as Href)}
      onPressSettings={() => router.navigate(ACCOUNT_SCREENS.SETTINGS as Href)}
      onPressProfile={() => router.navigate(ACCOUNT_SCREENS.PROFILE as Href)}
      onPressNetwork={() => router.navigate(ACCOUNT_SCREENS.NETWORK as Href)}
      onPressLogin={handleOnPressLogin}
      isAuthenticated={isAuthenticated}
      userName={isLoading ? 'Loading...' : user?.displayName}
      profilePhotoUrl={user?.profilePhotoUrl}
      description={user?.description}
    />
  );
};

export default Page;
