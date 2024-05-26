import { Ionicons } from '@expo/vector-icons';
import { LocationObjectCoords, PermissionStatus } from 'expo-location';
import { useRef } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

import { SelectLocationProps } from './SelectLocation.types';
import styles, { mapStyle } from './styles';

import { CustomMarker, FlashMessage, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { useLocationPermission } from '@/hooks';

const SelectLocation = ({
  onPanDrag,
  onRegionChangeComplete,
  inset,
  coordinates,
  onPressSelectLocation,
  setLabel,
}: SelectLocationProps) => {
  const mapRef = useRef<MapView>(null);
  const { getCurrentLocation, getLocationPermission } = useLocationPermission();

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
        latitude: (coords as LocationObjectCoords).latitude,
        longitude: (coords as LocationObjectCoords).longitude,
      },
    ]);
    setLabel('Current Location');
  };

  return (
    <>
      <View style={styles.flex}>
        <MapView
          ref={mapRef}
          initialRegion={coordinates}
          style={{ height: '92%' }}
          provider={PROVIDER_DEFAULT}
          showsTraffic={false}
          customMapStyle={mapStyle}
          onRegionChangeComplete={onRegionChangeComplete}
          onPanDrag={onPanDrag}
        />
        <View
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            top: '46%',
            left: '50%',
            zIndex: 1,
            translateX: -25,
            translateY: -25,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateX: -25 }, { translateY: -25 }],
          }}>
          <CustomMarker width={40} height={40} transform={[{ translateY: -20 }]} translateY={-20} />
        </View>
        <TouchableOpacity style={styles.locateBtn} onPress={setCurrentLocation}>
          <Ionicons name="navigate" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPressSelectLocation}>
          <TextDefault textColor={COLORS.buttonText} H4 bold>
            Select Location
          </TextDefault>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: inset.bottom }} />
    </>
  );
};

export default SelectLocation;
