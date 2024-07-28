import * as Linking from 'expo-linking';
import { PermissionStatus } from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashMessage, LocationPickerBottomSheet } from '@/components';
import { LocationPickerBottomSheetI } from '@/components/LocationPickerBottomSheet/types';
import { COLORS } from '@/constants';
import { useLocationPermission } from '@/hooks';
import { getCurrentLocationResponse } from '@/hooks/useLocationPermission/types';
import { CurrentLocation } from '@/screens';
import { useLocationStore } from '@/store';

function Page() {
  const inset = useSafeAreaInsets();
  const setLocation = useLocationStore((state) => state.setLocation);
  const { getCurrentLocation, getLocationPermission } = useLocationPermission();
  const bottomSheetRef = useRef<LocationPickerBottomSheetI>(null);

  const handlePresentModalPress = () => bottomSheetRef.current?.onOpen();

  const handleLocationSelection = (e: getCurrentLocationResponse) => {
    if (e.coords && e.address) {
      setLocation({
        label: e.address.name || e.address.formattedAddress || 'India',
        address: e.address,
        coords: e.coords,
      });
    }
  };

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
    handleLocationSelection(currentLocationStatus);
  };

  const onLocationSelected = (response: getCurrentLocationResponse) => {
    bottomSheetRef.current?.onClose();
    if (response.error) {
      FlashMessage({
        message: response.message ?? 'Failed to get current location',
      });
      return;
    }
    handleLocationSelection(response);
  };

  return (
    <>
      <StatusBar style="light" />
      <LocationPickerBottomSheet ref={bottomSheetRef} onLocationSelected={onLocationSelected} />
      <CurrentLocation
        style={{
          backgroundColor: COLORS.selectedText,
          paddingTop: inset.top,
          paddingBottom: inset.bottom,
        }}
        onPressSetCurrentLocation={setCurrentLocation}
        onPressSelectLocation={handlePresentModalPress}
      />
    </>
  );
}

export default Page;
