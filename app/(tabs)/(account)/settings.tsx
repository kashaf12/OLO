import { Href, useRouter } from 'expo-router';
import React from 'react';

import { ACCOUNT_SCREENS } from '@/constants';
import { useAuth } from '@/hooks';
import { Settings } from '@/screens';

const Page = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    router.dismissAll();
  };
  return (
    <Settings
      onPressPrivacy={() => router.navigate(ACCOUNT_SCREENS.PRIVACY as Href)}
      onPressNotification={() => router.navigate(ACCOUNT_SCREENS.NOTIFICATIONS as Href)}
      onPressLogout={handleLogout}
    />
  );
};

export default Page;
