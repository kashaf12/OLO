import { useRouter } from 'expo-router';
import React from 'react';

import { ACCOUNT_SCREENS, BASE_SCREENS } from '@/constants';
import { useAuth } from '@/hooks';
import { MainAccount } from '@/screens';

const Page = () => {
  const router = useRouter();
  const { user, isAuthenticated, setAuthSkipped } = useAuth();

  const handleOnPressLogin = () => {
    if (!isAuthenticated) {
      setAuthSkipped(false);
      router.push(BASE_SCREENS.AUTHENTICATION);
    }
  };

  return (
    <MainAccount
      onPressHelp={() => router.navigate(ACCOUNT_SCREENS.HELP)}
      onPressSettings={() => router.navigate(ACCOUNT_SCREENS.SETTINGS)}
      onPressProfile={() => router.navigate(ACCOUNT_SCREENS.PROFILE)}
      onPressNetwork={() => router.navigate(ACCOUNT_SCREENS.NETWORK)}
      onPressLogin={handleOnPressLogin}
      isAuthenticated={isAuthenticated}
      userName={user?.displayName || 'OLO USER'}
    />
  );
};

export default Page;
