import * as Location from 'expo-location';

export default function useLocationPermission() {
  const getLocationPermission = () => Location.getForegroundPermissionsAsync();

  const askLocationPermission = () => Location.requestForegroundPermissionsAsync();

  const getCurrentLocation = async () => {
    const { status } = await askLocationPermission();
    if (status === Location.PermissionStatus.GRANTED) {
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: 1,
        });
        return { ...location, error: false };
      } catch (e) {
        if (e instanceof Error) {
          return { error: true, message: e.message };
        }
        return { error: true, message: 'Failed to retrieve location', coords: null };
      }
    }
    return { error: true, message: 'Location permission was not granted' };
  };

  return { getCurrentLocation, getLocationPermission };
}
