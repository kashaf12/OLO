import React, { forwardRef, ForwardedRef } from 'react';
import { StyleSheet } from 'react-native';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';

import styles from './styles';

const PhoneNumberInput = forwardRef<PhoneInput, PhoneInputProps>(
  ({ containerStyle, textContainerStyle, ...props }, ref: ForwardedRef<PhoneInput>) => {
    return (
      <PhoneInput
        ref={ref}
        defaultCode="IN"
        layout="first"
        autoFocus
        containerStyle={StyleSheet.compose(styles.container, containerStyle)}
        textContainerStyle={StyleSheet.compose(styles.textContainer, textContainerStyle)}
        {...props}
      />
    );
  }
);

export default React.memo(PhoneNumberInput);
