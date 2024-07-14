import { useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashMessage, LoadingModal } from '@/components';
import { AUTH_SCREENS } from '@/constants';
import { useAuth } from '@/hooks';
import { Authentication } from '@/screens';

const Page = () => {
  const {
    signInWithGoogle,
    isGoogleSignInLoading,
    isPhoneVerificationLoading,
    sendPhoneVerification,
  } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch {
      FlashMessage({
        message: 'Failed to Login using google',
      });
    }
  };

  const handlePhoneLogin = async (phoneNumber: string) => {
    try {
      await sendPhoneVerification(phoneNumber);
      router.navigate({
        pathname: AUTH_SCREENS.OTP_PAGE,
        params: { phoneNumber },
      });
    } catch {
      FlashMessage({
        message: 'Failed to send OTP',
      });
    }
  };

  return (
    <>
      <LoadingModal modalVisible={isPhoneVerificationLoading} title="Sending OTP" />
      <Authentication
        insets={insets}
        onPressSkip={() => console.log('press skip')}
        onPressGoogle={handleGoogleLogin}
        onPressPhoneNumber={handlePhoneLogin}
        isGoogleSignInLoading={isGoogleSignInLoading}
      />
    </>
  );
};

export default Page;
