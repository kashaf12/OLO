import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { useLocationPermission } from '@/hooks';
import { SelectLocation } from '@/screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocationStore } from '@/store';
import MapView from 'react-native-maps';
import { COLORS } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import { FlashMessage } from '@/components';
import { PermissionStatus } from 'expo-location';
import { Linking } from 'react-native';

const LATITUDE = 33.699265;
const LONGITUDE = 72.974575;
const LATITUDE_DELTA = 40;
const LONGITUDE_DELTA = 40;

function Page() {
  const { longitude, latitude } = useLocalSearchParams();

  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const { getCurrentLocation, getLocationPermission } = useLocationPermission();

  const setLocation = useLocationStore();
  const [label, setLabel] = useState(
    longitude && latitude ? 'Current Location' : 'Selected Location'
  );

  const [coordinates, setCorrdinates] = useState({
    latitude: latitude || LATITUDE,
    longitude: longitude || LONGITUDE,
    latitudeDelta: latitude ? 0.003 : LATITUDE_DELTA,
    longitudeDelta: longitude ? 0.003 : LONGITUDE_DELTA,
  });
  const mapRef = useRef<MapView>();

  useLayoutEffect(() => {
    // navigation
    navigation.setOptions({
      title: 'Set Location',
      fontColor: COLORS.fontMainColor,
      backColor: COLORS.white,
      iconColor: COLORS.fontThirdColor,
      lineColor: COLORS.lightHorizontalLine,
      setCurrentLocation,
    });
  });

  const setCurrentLocation = async () => {
    const { status, canAskAgain } = await getLocationPermission();
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
    const { error, coords, message } = await getCurrentLocation();
    if (error) {
      FlashMessage({
        message: message ?? 'Could not get location',
      });
      return;
    }
    mapRef?.current?.fitToCoordinates([
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    ]);
    setLabel('Current Location');
  };
  const onSelectLocation = () => {
    console.log({
      label,
      deliveryAddress: label,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    setLocation({
      label,
      deliveryAddress: label,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
  };
  const onRegionChangeComplete = (coordinates) => {
    setCorrdinates({
      ...coordinates,
    });
  };

  const onPanDrag = (event) => {
    console.log({ event });
    setLabel('Selected Location');
  };

  return (
    <>
      <StatusBar style="dark" />
      <SelectLocation
        inset={inset}
        ref={ref}
        onPanDrag={onPanDrag}
        onPressSelectLocation={onSelectLocation}
        onRegionChangeComplete={onRegionChangeComplete}
        coordinates={coordinates}
      />
    </>
  );
}

export default Page;
