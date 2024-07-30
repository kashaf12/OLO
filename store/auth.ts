import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';

import { UserType } from '@/types';

interface AuthState {
  authSkipped: boolean;
  user: FirebaseAuthTypes.User | null;
  userInfo: UserType | null;
  isLoading: boolean;
  isGoogleSignInLoading: boolean;
  isPhoneVerificationLoading: boolean;
  confirm: FirebaseAuthTypes.ConfirmationResult | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setUserInfo: (userInfo: UserType | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsGoogleSignInLoading: (isLoading: boolean) => void;
  setIsPhoneVerificationLoading: (isLoading: boolean) => void;
  setConfirm: (confirm: FirebaseAuthTypes.ConfirmationResult | null) => void;
  setAuthSkipped: (skipped: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authSkipped: false,
  user: null,
  userInfo: null,
  isLoading: true,
  isGoogleSignInLoading: false,
  isPhoneVerificationLoading: false,
  confirm: null,
  setUser: (user) => set({ user }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsGoogleSignInLoading: (isLoading) => set({ isGoogleSignInLoading: isLoading }),
  setIsPhoneVerificationLoading: (isLoading) => set({ isPhoneVerificationLoading: isLoading }),
  setConfirm: (confirm) => set({ confirm }),
  setAuthSkipped: (skipped) => set({ authSkipped: skipped }),
}));
