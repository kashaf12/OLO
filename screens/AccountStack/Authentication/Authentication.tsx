import React from 'react';
import { Image, View } from 'react-native';

import { AuthenticationProps } from './Authentication.types';
import styles from './styles';

import { LoginButton, SkipButton, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { scale } from '@/utils';

const icon = require('@/assets/olo-icon.png');

function Authentication({ insets, onPressSkip }: AuthenticationProps) {
  return (
    <View style={[styles.safeAreaViewStyles, styles.flex, { paddingTop: insets.top }]}>
      <View
        style={[
          styles.flex,
          styles.mainContainer,
          {
            backgroundColor: COLORS.headerbackground,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: insets.right + scale(15),
          }}>
          <SkipButton onPress={onPressSkip} />
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.image}>
            <Image source={icon} style={styles.imgResponsive} resizeMode="contain" />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <LoginButton
            style={{ width: '85%' }}
            icon="social-google"
            title=" Continue with Gmail"
            // loading={loading && loginButton === 'Google'}
            // onPressIn={() => {
            //   setLoginButton('Google');
            // }}
            // disabled={!googleRequest}
            // onPress={() => googlePromptAsync()}
          />
        </View>
        {/* {enableApple && (
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.buttonbackground }}>
            {renderAppleAction()}
          </View>
        )} */}
        <View style={[styles.footerContainer, { paddingBottom: insets.bottom }]}>
          <TextDefault textColor={COLORS.fontPlaceholder} bold center small>
            If you Continue, you are accepting
          </TextDefault>
          <TextDefault
            textColor={COLORS.fontPlaceholder}
            bold
            center
            small
            style={{ textDecorationLine: 'underline' }}>
            APP Terms and Conditions and Privacy Policy
          </TextDefault>
        </View>
      </View>
    </View>
  );
}

export default React.memo(Authentication);
