import { LocationGeocodedAddress, LocationObjectCoords } from 'expo-location';

export type getCurrentLocationResponse = {
  coords?: Pick<LocationObjectCoords, 'latitude' | 'longitude'>;
  error: boolean;
  address?: LocationGeocodedAddress;
  message?: string;
};
