import { useRouter } from 'expo-router';
import React from 'react';

import { SELL_SCREENS } from '@/constants';
import { SellingForm } from '@/screens';

const Page = () => {
  const router = useRouter();

  const handleOnPressNext = () => {
    router.navigate({
      pathname: SELL_SCREENS.UPLOAD_IMAGE,
    });
  };

  return <SellingForm onPressNext={handleOnPressNext} />;
};

export default Page;
