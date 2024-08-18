import { Href, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';

import { SELL_SCREENS } from '@/constants';
import { LocationConfirm } from '@/screens';

const Page = () => {
  const navigation = useNavigation();
  const router = useRouter();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Confirm your location',
    });
  }, []);

  const handleOnPressFullMap = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    router.navigate({
      pathname: SELL_SCREENS.FULL_MAP,
      params: {
        latitude,
        longitude,
        currentScreen: SELL_SCREENS.LOCATION_CONFIRM,
        title: 'Map',
      },
    } as Href<string>);
  };

  return <LocationConfirm onPressFullMap={handleOnPressFullMap} defaultFormData={{}} />;
};

export default Page;
