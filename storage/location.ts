import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const LOCATION_ID = 'olo__location__storage';

const locationStorage = new MMKV({
  id: LOCATION_ID,
});

export const locationStateStorage: StateStorage = {
  setItem: (name, value) => {
    console.log('setItem', name, value);
    return locationStorage.set(name, value);
  },
  getItem: (name) => {
    console.log('getItem', name);
    const value = locationStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    console.log('removeItem', name);
    return locationStorage.delete(name);
  },
};
