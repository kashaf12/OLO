import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { locationStateStorage } from '@/storage';

const LOCATION_ZUSTAND_STORAGE_KEY = 'location__storage';

export interface LocationStoreState {
  address: string;
  latitude: number;
  longitude: number;
  label: string;
  isSet: boolean;
  setLabel: (label: string) => void;
  setAddress: (address: string) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setLocation: ({
    label,
    address,
    latitude,
    longitude,
  }: {
    label: string;
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
}

export const useLocationStore = create<LocationStoreState>()(
  persist(
    (set) => ({
      isSet: false,
      address: 'Current location',
      latitude: 26.867287853605735,
      longitude: 80.95443866441771,
      label: 'Current location',
      setLabel: (label) => set({ label }),
      setAddress: (address) => set({ address }),
      setLatitude: (latitude) => set({ latitude }),
      setLongitude: (longitude) => set({ longitude }),
      setLocation: ({ label, address, latitude, longitude }) =>
        set({ label, address, latitude, longitude, isSet: true }),
    }),
    {
      name: LOCATION_ZUSTAND_STORAGE_KEY,
      storage: createJSONStorage(() => locationStateStorage),
    }
  )
);
