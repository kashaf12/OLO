import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const LOCATION_ID = 'olo__location__storage';

const locationStorage = new MMKV({
  id: LOCATION_ID,
});

export const locationStateStorage: StateStorage = {
  setItem: (name, value) => {
    return locationStorage.set(name, value);
  },
  getItem: (name) => {
    const value = locationStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return locationStorage.delete(name);
  },
};
