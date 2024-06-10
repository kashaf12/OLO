import { useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Authentication } from '@/screens';

const Page = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return <Authentication insets={insets} onPressSkip={() => router.back()} />;
};

export default Page;
