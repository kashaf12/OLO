import { PermissionStatus } from 'expo-location';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, LOCATION_SCREENS } from '@/constants';
import { useLocationPermission } from '@/hooks';
import { CurrentLocation } from '@/screens';

function Page() {
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const { getCurrentLocation, getLocationPermission } = useLocationPermission();

  const setCurrentLocation = async () => {
    const locationPermission = await getLocationPermission();

    console.log(locationPermission);
    const { status, canAskAgain } = locationPermission;
    if (status !== PermissionStatus.GRANTED && !canAskAgain) {
      // FlashMessage({
      //   message:
      //     'Tap on this message to open Settings then allow app to use location from permissions.',
      //   onPress: async () => {
      //     await Linking.openSettings();
      //   },
      // });
      return;
    }
    const { error, coords, message } = await getCurrentLocation();
    console.log({ error, coords, message });
    // if (error) {
    //   FlashMessage({
    //     message,
    //   });
    //   return;
    // }
    router.navigate({
      pathname: LOCATION_SCREENS.SELECT_LOCATION,
      params: coords,
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
