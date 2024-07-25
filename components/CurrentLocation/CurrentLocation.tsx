import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';

import { CurrentLocationComponentProps } from './CurrentLocation.types';
import styles from './style';
import { TextDefault } from '../Text';

import { COLORS } from '@/constants';
import { useLocationPermission } from '@/hooks';

const CurrentLocationComponent: React.FC<CurrentLocationComponentProps> = ({
  onLocationSelect,
}) => {
  const { getCurrentLocation, getLocationPermission } = useLocationPermission();
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await getLocationPermission();
    setPermissionStatus(status);
    if (status === Location.PermissionStatus.GRANTED) {
      fetchCurrentLocation();
    }
  };

  const fetchCurrentLocation = async () => {
    const result = await getCurrentLocation();
    if (!result.error && result.coords) {
      const { latitude, longitude } = result.coords;
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address[0]) {
        setCurrentAddress(`${address[0].street}, ${address[0].city}, ${address[0].region}`);
      }
    } else {
      console.error('Error getting current location:', result.message);
    }
  };

  const handleEnableLocation = async () => {
    if (permissionStatus === Location.PermissionStatus.DENIED) {
      Linking.openSettings();
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      if (status === Location.PermissionStatus.GRANTED) {
        fetchCurrentLocation();
      }
    }
  };

  const handleUseCurrentLocation = async () => {
    const result = await getCurrentLocation();
    if (!result.error && result.coords) {
      onLocationSelect(result.coords.latitude, result.coords.longitude);
    } else {
      console.error('Error getting current location:', result.message);
    }
  };

  if (permissionStatus === Location.PermissionStatus.GRANTED) {
    return (
      <TouchableOpacity style={styles.container} onPress={handleUseCurrentLocation}>
        <View style={styles.leftContent}>
          <MaterialIcons name="my-location" size={24} color={COLORS.primary} />
          <View style={styles.textContainer}>
            <TextDefault style={styles.title}>Use current location</TextDefault>
            <TextDefault style={styles.subtitle}>
              {currentAddress || 'Fetching address...'}
            </TextDefault>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={COLORS.fontSecondColor} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <MaterialIcons name="my-location" size={24} color={COLORS.errorColor} />
        <View style={styles.textContainer}>
          <TextDefault style={styles.title}>Location permission is not enabled</TextDefault>
          <TextDefault style={styles.subtitle}>Tap here to enable</TextDefault>
        </View>
      </View>
      <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
        <TextDefault style={styles.enableButtonText}>Enable</TextDefault>
      </TouchableOpacity>
    </View>
  );
};
export default CurrentLocationComponent;
