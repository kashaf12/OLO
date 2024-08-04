import { create } from 'zustand';

export interface StatsType {
  totalAds: number;
  activeAds: number;
  totalSales: number;
  totalPurchases: number;
  rating: number;
}

export interface UserType {
  displayName: string;
  email: string | null;
  description: string | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  isActive: boolean;
  stats: StatsType | null;
  profilePhotoUrl?: string | null;
}

interface UserInfoState {
  userInfo: UserType | null;
  isLoading: boolean;
  setUserInfo: (userInfo: UserType | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfo: null,
  isLoading: true,
  setUserInfo: (userInfo) => set({ userInfo }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
