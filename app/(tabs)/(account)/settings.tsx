import { useRouter } from 'expo-router';
import React from 'react';

import { ACCOUNT_SCREENS } from '@/constants';
import { Settings } from '@/screens';

const Page = () => {
  const router = useRouter();
  return (
    <Settings
      onPressPrivacy={() => router.navigate(ACCOUNT_SCREENS.PRIVACY)}
      onPressNotification={() => router.navigate(ACCOUNT_SCREENS.NOTIFICATIONS)}
    />
  );
};

export default Page;
