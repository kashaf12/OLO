import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SelectLocation } from '@/screens';
import { useLocationStore } from '@/store';

const LATITUDE = 26.867287853605735;
const LONGITUDE = 80.95443866441771;
const LATITUDE_DELTA = 40;
const LONGITUDE_DELTA = 40;

function Page() {
  const { longitude, latitude } = useLocalSearchParams();
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const setLocation = useLocationStore((state) => state.setLocation);
  const [label, setLabel] = useState(
    longitude && latitude ? 'Current Location' : 'Selected Location'
  );
  const [coordinates, setCorrdinates] = useState({
    latitude: Number(latitude) || LATITUDE,
    longitude: Number(longitude) || LONGITUDE,
    latitudeDelta: Number(latitude) ? 0.003 : LATITUDE_DELTA,
    longitudeDelta: Number(longitude) ? 0.003 : LONGITUDE_DELTA,
  });

  const onSelectLocation = () => {
    setLocation({
      label,
      address: label,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    router.replace('(tabs)');
  };
  const onRegionChangeComplete = (coordinates: Region) => {
    setCorrdinates({
      ...coordinates,
    });
  };

  const onPanDrag = () => {
    setLabel('Selected Location');
  };

  return (
    <>
      <StatusBar style="dark" />
      <SelectLocation
        inset={inset}
        onPanDrag={onPanDrag}
        onPressSelectLocation={onSelectLocation}
        onRegionChangeComplete={onRegionChangeComplete}
        coordinates={coordinates}
        setLabel={setLabel}
      />
    </>
  );
}

export default Page;
