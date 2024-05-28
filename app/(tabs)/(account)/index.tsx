import { useRouter } from 'expo-router';
import React from 'react';

import { ACCOUNT_SCREENS } from '@/constants';
import { MainAccount } from '@/screens';

const Page = () => {
  const router = useRouter();
  return (
    <MainAccount
      onPressHelp={() => router.navigate(ACCOUNT_SCREENS.HELP)}
      onPressSettings={() => router.navigate(ACCOUNT_SCREENS.SETTINGS)}
      onPressProfile={() => router.navigate(ACCOUNT_SCREENS.PROFILE)}
      onPressNetwork={() => router.navigate(ACCOUNT_SCREENS.NETWORK)}
    />
  );
};

export default Page;
