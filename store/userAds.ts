import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { create } from 'zustand';

export interface LocationType {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  district: string;
  isoCountryCode: string;
  postalCode: string;
  region: string;
  street: string;
  streetNumber: string;
  subregion: string;
  timezone: string;
}

export interface ImageType {
  id: string;
  mime: string;
  name: string;
  original: string;
  thumbnail?: string;
}

export type StatusType =
  | 'created'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'deactivated'
  | 'active'
  | 'sold';

export interface AiCheckResultType {
  passed: boolean;
  flags: string[];
}

export interface AdType {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition?: string;
  location: LocationType;
  images: ImageType[];
  status: StatusType;
  createdAt: FirebaseFirestoreTypes.FieldValue;
  updatedAt: FirebaseFirestoreTypes.FieldValue;
  views: number;
  likesCount: number;
  reviewedAt?: FirebaseFirestoreTypes.FieldValue;
  reviewNotes?: string;
  aiCheckResult?: AiCheckResultType;
}

interface UserAdsState {
  ads: AdType[];
  isLoading: boolean;
  error: string | null;
  setAds: (ads: AdType[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserAdsStore = create<UserAdsState>((set, get) => ({
  ads: [],
  isLoading: false,
  error: null,
  setAds: (ads) => set({ ads }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
