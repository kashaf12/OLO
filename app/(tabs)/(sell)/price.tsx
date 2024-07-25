import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';

import { SELL_SCREENS } from '@/constants';
import { Price } from '@/screens';

const Page = () => {
  const navigation = useNavigation();
  const router = useRouter();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Set a price',
    });
  }, []);

  const handleOnPressNext = () => {
    router.navigate(SELL_SCREENS.LOCATION_CONFIRM);
  };

  return (
    <Price
      onPressNext={handleOnPressNext}
      defaultFormData={{
        price: '100',
      }}
    />
  );
};

export default Page;
