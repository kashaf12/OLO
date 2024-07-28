import * as Location from 'expo-location';

export default function useLocationPermission() {
  const getLocationPermission = () => Location.getForegroundPermissionsAsync();

  const askLocationPermission = () => Location.requestForegroundPermissionsAsync();

  const getAddress = async ({
    latitude,
    longitude,
  }: Pick<Location.LocationObjectCoords, 'latitude' | 'longitude'>) => {
    try {
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        return {
          error: false,
          address: address[0],
        };
      }
      return {
        error: true,
        message: 'Failed to reverse geocode',
      };
    } catch (e) {
      if (e instanceof Error) {
        console.error(e?.message);
        return { error: true, message: e.message };
      }
      return { error: true, message: 'Failed to reverse geocode' };
    }
  };

  const getCurrentLocation = async () => {
    const { status } = await askLocationPermission();
    if (status === Location.PermissionStatus.GRANTED) {
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: 1,
        });
        const { latitude, longitude } = location.coords;

        const address = await getAddress({ latitude, longitude });
        if (!address.error) {
          return {
            coords: {
              latitude,
              longitude,
            },
            error: false,
            address: address.address,
          };
        }
        return {
          error: true,
          message: address.message ?? 'Failed to reverse geocode',
        };
      } catch (e) {
        if (e instanceof Error) {
          return {
            error: true,
            message: e.message,
          };
        }
        return { error: true, message: 'Failed to retrieve location' };
      }
    }
    return {
      error: true,
      message: 'Location permission was not granted',
    };
  };

  return { getCurrentLocation, getLocationPermission, getAddress };
}
