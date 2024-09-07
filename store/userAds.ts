import { create } from 'zustand';

import { AdType } from './ads';

interface UserAdsState {
  ads: AdType[];
  isLoading: boolean;
  error: string | null;
  setAds: (ads: AdType[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserAdsStore = create<UserAdsState>((set) => ({
  ads: [],
  isLoading: false,
  error: null,
  setAds: (ads) => set({ ads }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
