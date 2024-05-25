import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { locationStateStorage } from '@/storage';

const LOCATION_ZUSTAND_STORAGE_KEY = 'location__storage';

export const useLocationStore = create(
  persist(
    (set, get) => ({
      location: 0,
      label: 'Current location',
      setLocation: () => set({ location: 0 }),
      setLabel: (label: string) => set({ label }),
    }),
    {
      name: LOCATION_ZUSTAND_STORAGE_KEY,
      storage: createJSONStorage(() => locationStateStorage),
    }
  )
);
