import React, { Ref, forwardRef } from 'react';
import { View, TextInput } from 'react-native';

import { OtpTextInputProps } from './OtpTextInput.types';
import styles from './styles';

const OtpTextInput = function (
  { containerStyle, style, ...remainingProps }: OtpTextInputProps,
  ref: Ref<TextInput>
) {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <TextInput
        {...remainingProps}
        style={[styles.textInputStyle, styles.fill, style]}
        ref={ref}
      />
    </View>
  );
};

export default forwardRef(OtpTextInput);
