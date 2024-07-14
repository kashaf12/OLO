import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { FlashMessage } from '@/components';
import { useAuth } from '@/hooks';
import { OtpVerification } from '@/screens';

const Page = () => {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const { verifyPhoneCode, sendPhoneVerification } = useAuth();

  const handleVerifyOtp = async (otp: string) => {
    await verifyPhoneCode(otp);
  };

  const handleResendOtp = async () => {
    if (!phoneNumber) return;
    try {
      await sendPhoneVerification(phoneNumber);
    } catch {
      FlashMessage({
        message: 'Failed to send OTP',
      });
    }
  };

  return (
    <OtpVerification
      phoneNumber={phoneNumber || ''}
      onSubmitOtp={handleVerifyOtp}
      onResendOtp={handleResendOtp}
    />
  );
};

export default Page;
