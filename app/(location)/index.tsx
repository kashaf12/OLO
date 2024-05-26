import * as Linking from 'expo-linking';
import { LocationObjectCoords, PermissionStatus } from 'expo-location';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashMessage } from '@/components';
import { COLORS, LOCATION_SCREENS } from '@/constants';
import { useLocationPermission } from '@/hooks';
import { CurrentLocation } from '@/screens';

function Page() {
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const { getCurrentLocation, getLocationPermission } = useLocationPermission();

  const setCurrentLocation = async () => {
    const locationPermission = await getLocationPermission();

    const { status, canAskAgain } = locationPermission;
    if (status !== PermissionStatus.GRANTED && !canAskAgain) {
      FlashMessage({
        message:
          'Tap on this message to open Settings then allow app to use location from permissions.',
        onPress: async () => {
          await Linking.openSettings();
        },
      });
      return;
    }
    const currentLocationStatus = await getCurrentLocation();
    if (currentLocationStatus.error) {
      FlashMessage({
        message: currentLocationStatus.message ?? 'Failed to get current location',
      });
      return;
    }
    router.navigate({
      pathname: LOCATION_SCREENS.SELECT_LOCATION,
      params: currentLocationStatus.coords as LocationObjectCoords,
    });
  };
  return (
    <>
      <StatusBar style="light" />
      <CurrentLocation
        style={{
          backgroundColor: COLORS.selectedText,
          paddingTop: inset.top,
          paddingBottom: inset.bottom,
        }}
        onPressSetCurrentLocation={setCurrentLocation}
        onPressSelectLocation={() => router.navigate(LOCATION_SCREENS.SELECT_LOCATION)}
      />
    </>
  );
}

export default Page;
