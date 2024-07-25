import React, { useRef, useState } from 'react';
import { Image, View, KeyboardAvoidingView, Platform } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

import { AuthenticationProps } from './Authentication.types';
import styles from './styles';

import { FlashMessage, LoginButton, PhoneNumberInput, SkipButton, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { scale } from '@/utils';

const APP_ICON = require('@/assets/olo-icon.png');

const AuthenticationScreen = ({
  insets,
  onPressSkip,
  onPressGoogle,
  onPressPhoneNumber,
  isGoogleSignInLoading = false,
}: AuthenticationProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const phoneInputRef = useRef<PhoneInput>(null);

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    const isValid = phoneInputRef.current?.isValidNumber(text) ?? false;
    setIsPhoneNumberValid(isValid);
  };

  const handlePhoneNumberContinue = () => {
    if (!isPhoneNumberValid) {
      FlashMessage({
        message: 'Please enter a valid phone number',
        position: 'bottom',
      });
      return;
    }

    onPressPhoneNumber?.(formattedPhoneNumber);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.safeAreaView, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <View style={styles.mainContainer}>
        <View style={[styles.skipButtonContainer, { paddingRight: insets.right + scale(15) }]}>
          <SkipButton onPress={onPressSkip} />
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.imageWrapper}>
            <Image source={APP_ICON} style={styles.appIcon} resizeMode="contain" />
          </View>
        </View>
        <View style={styles.authenticationContainer}>
          <TextDefault textColor={COLORS.fontPlaceholder} bolder center H5>
            Log in or Sign up
          </TextDefault>
          <View style={styles.phoneInputContainer}>
            <PhoneNumberInput
              containerStyle={styles.phoneInputWidth}
              ref={phoneInputRef}
              defaultValue={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              onChangeFormattedText={setFormattedPhoneNumber}
              textInputProps={{
                keyboardType: 'number-pad',
              }}
            />
            <LoginButton
              style={styles.phoneInputWidth}
              title="Continue"
              onPress={handlePhoneNumberContinue}
            />
          </View>
          <TextDefault textColor={COLORS.fontPlaceholder} bold>
            or
          </TextDefault>
          <LoginButton
            style={styles.phoneInputWidth}
            icon="social-google"
            title="Continue with Gmail"
            onPress={onPressGoogle}
            loading={isGoogleSignInLoading}
          />
        </View>
        <View style={[styles.footerContainer, { paddingBottom: insets.bottom }]}>
          <TextDefault textColor={COLORS.fontPlaceholder} bold center small>
            If you Continue, you are accepting
          </TextDefault>
          <TextDefault
            textColor={COLORS.fontPlaceholder}
            bold
            center
            small
            style={styles.underlinedText}>
            App Terms and Conditions and Privacy Policy
          </TextDefault>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(AuthenticationScreen);
