import { LocationGeocodedAddress, LocationObjectCoords } from 'expo-location';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { locationStateStorage } from '@/storage';

const LOCATION_ZUSTAND_STORAGE_KEY = 'location__storage';

export interface LocationStoreState {
  address?: LocationGeocodedAddress;
  coords?: Pick<LocationObjectCoords, 'latitude' | 'longitude'>;
  label: string;
  isSet: boolean;
  setLabel: (label: string) => void;
  setAddress: (address: LocationGeocodedAddress) => void;
  setCoords: (coords: Pick<LocationObjectCoords, 'latitude' | 'longitude'>) => void;
  setLocation: (location: Omit<Partial<LocationStoreState>, 'setLocation'>) => void;
}

export const useLocationStore = create<LocationStoreState>()(
  persist(
    (set) => ({
      isSet: false,
      address: undefined,
      coords: undefined,
      label: 'Current location',
      setLabel: (label) => set({ label }),
      setAddress: (address) => set({ address }),
      setCoords: (coords) => set({ coords }),
      setLocation: (location) => set({ isSet: true, ...location }),
    }),
    {
      name: LOCATION_ZUSTAND_STORAGE_KEY,
      storage: createJSONStorage(() => locationStateStorage),
    }
  )
);
