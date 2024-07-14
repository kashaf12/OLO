import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { OtpVerificationProps } from './OtpVerification.types';
import styles from './styles';

import { TextDefault, TextTimer, OtpInputContainer, DefaultTextButton } from '@/components';
import { OtpInputContainerRef } from '@/components/OtpInputContainer/OtpInputContainer.types';

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs

/**
 * OtpVerification component for handling OTP input and verification
 */
const OtpVerification = ({ phoneNumber, onSubmitOtp, onResendOtp }: OtpVerificationProps) => {
  const [otpArray, setOtpArray] = useState<string[]>(['', '', '', '', '', '']);
  const [submittingOtp, setSubmittingOtp] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resendButtonDisabledTime, setResendButtonDisabledTime] =
    useState<number>(RESEND_OTP_TIME_LIMIT);

  const otpInputContainerRef = useRef<OtpInputContainerRef>(null);
  const resendOtpTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Starts the timer for OTP resend button
   */
  const startResendOtpTimer = useCallback(() => {
    if (resendOtpTimerIntervalRef.current) {
      clearInterval(resendOtpTimerIntervalRef.current);
    }
    resendOtpTimerIntervalRef.current = setInterval(() => {
      setResendButtonDisabledTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(resendOtpTimerIntervalRef.current!);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerIntervalRef.current) {
        clearInterval(resendOtpTimerIntervalRef.current);
      }
    };
  }, [startResendOtpTimer]);

  /**
   * Handles OTP resend button press
   */
  const onResendOtpButtonPress = async () => {
    try {
      setOtpArray(['', '', '', '', '', '']);
      otpInputContainerRef.current?.focusInput(0);
      setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
      startResendOtpTimer();

      await onResendOtp();
      // Handle successful resend
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setErrorMessage('Failed to resend OTP. Please try again.');
    }
  };

  /**
   * Handles OTP submission
   */
  const onSubmitButtonPress = async () => {
    setSubmittingOtp(true);
    setErrorMessage('');
    try {
      const otp = otpArray.join('');
      await onSubmitOtp(otp);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setErrorMessage('Failed to verify OTP. Please try again.');
    } finally {
      setSubmittingOtp(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0} // Adjust this value as needed
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <TextDefault H4>We have sent a verification code to</TextDefault>
              <TextDefault H4 bold style={styles.phoneNumberText}>
                {phoneNumber}
              </TextDefault>
            </View>
            <OtpInputContainer
              otpArray={otpArray}
              onOtpArrayChange={setOtpArray}
              ref={otpInputContainerRef}
            />

            {errorMessage ? (
              <TextDefault style={styles.errorContainer}>{errorMessage}</TextDefault>
            ) : null}
            {resendButtonDisabledTime > 0 ? (
              <TextTimer text="Resend OTP in" time={resendButtonDisabledTime} />
            ) : (
              <DefaultTextButton
                type="link"
                text="Resend OTP"
                buttonStyle={styles.otpResendButton}
                textStyle={styles.otpResendButtonText}
                onPress={onResendOtpButtonPress}
              />
            )}
            {submittingOtp && <ActivityIndicator style={styles.activityIndicator} />}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <DefaultTextButton
            buttonStyle={styles.fillWidthButton}
            type="fill"
            text="Submit"
            textStyle={styles.submitButtonText}
            onPress={onSubmitButtonPress}
            disabled={submittingOtp || otpArray.some((digit) => digit === '')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;
