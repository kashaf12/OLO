import { useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashMessage, LoadingModal } from '@/components';
import { AUTH_SCREENS, BASE_SCREENS } from '@/constants';
import { useAuth } from '@/hooks';
import { Authentication } from '@/screens';

const Page = () => {
  const {
    signInWithGoogle,
    isGoogleSignInLoading,
    isPhoneVerificationLoading,
    sendPhoneVerification,
    skipAuthentication,
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

  const handleSkip = () => {
    skipAuthentication();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(BASE_SCREENS.LOCATION_SCREENS);
    }
  };

  return (
    <>
      <LoadingModal modalVisible={isPhoneVerificationLoading} title="Sending OTP" />
      <Authentication
        insets={insets}
        onPressSkip={handleSkip}
        onPressGoogle={handleGoogleLogin}
        onPressPhoneNumber={handlePhoneLogin}
        isGoogleSignInLoading={isGoogleSignInLoading}
      />
    </>
  );
};

export default Page;
