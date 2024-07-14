import React, { useRef, memo, useImperativeHandle, forwardRef, Ref } from 'react';
import { Platform, View, TextInput } from 'react-native';

import {
  OtpInputContainerProps,
  OtpInputContainerRef,
  RefCallback,
} from './OtpInputContainer.types';
import styles from './styles';
import { OtpTextInput } from '../OtpTextInput';

const OtpInputContainer = (
  { onOtpArrayChange, otpArray = [] }: OtpInputContainerProps,
  ref: Ref<OtpInputContainerRef>
) => {
  const firstTextInputRef = useRef<TextInput>(null);
  const secondTextInputRef = useRef<TextInput>(null);
  const thirdTextInputRef = useRef<TextInput>(null);
  const fourthTextInputRef = useRef<TextInput>(null);
  const fifthTextInputRef = useRef<TextInput>(null);
  const sixthTextInputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focusInput: (index: number) => {
      const refs = [
        firstTextInputRef,
        secondTextInputRef,
        thirdTextInputRef,
        fourthTextInputRef,
        fifthTextInputRef,
        sixthTextInputRef,
      ];
      if (index >= 0 && index < refs.length) {
        refs[index].current?.focus();
      }
    },
    getInputRefs: () => [
      firstTextInputRef,
      secondTextInputRef,
      thirdTextInputRef,
      fourthTextInputRef,
      fifthTextInputRef,
      sixthTextInputRef,
    ],
  }));

  const onOtpChange = (index: number) => {
    return (value: string) => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      onOtpArrayChange?.(otpArrayCopy);

      if (value !== '') {
        if (index === 0) {
          secondTextInputRef?.current?.focus();
        } else if (index === 1) {
          thirdTextInputRef?.current?.focus();
        } else if (index === 2) {
          fourthTextInputRef?.current?.focus();
        } else if (index === 3) {
          fifthTextInputRef?.current?.focus();
        } else if (index === 4) {
          sixthTextInputRef?.current?.focus();
        }
      }
    };
  };

  const onOtpKeyPress = (index: number) => {
    return ({ nativeEvent: { key: value } }: { nativeEvent: { key: string } }) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef?.current?.focus();
        } else if (index === 2) {
          secondTextInputRef?.current?.focus();
        } else if (index === 3) {
          thirdTextInputRef?.current?.focus();
        } else if (index === 4) {
          fourthTextInputRef?.current?.focus();
        } else if (index === 5) {
          fifthTextInputRef?.current?.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (Platform.OS === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          onOtpArrayChange?.(otpArrayCopy);
        }
      }
    };
  };

  const createRefCallback = (
    textInputRef: React.MutableRefObject<TextInput | null>
  ): RefCallback => {
    return (node: TextInput | null) => {
      textInputRef.current = node;
    };
  };

  return (
    <View style={styles.containerStyle}>
      {[
        firstTextInputRef,
        secondTextInputRef,
        thirdTextInputRef,
        fourthTextInputRef,
        fifthTextInputRef,
        sixthTextInputRef,
      ].map((textInputRef, index) => (
        <OtpTextInput
          containerStyle={styles.textInputStyle}
          value={otpArray[index]}
          onKeyPress={onOtpKeyPress(index)}
          onChangeText={onOtpChange(index)}
          keyboardType="numeric"
          maxLength={1}
          style={styles.textStyle}
          autoFocus={index === 0 ? true : undefined}
          ref={createRefCallback(textInputRef)}
          key={index}
        />
      ))}
    </View>
  );
};

export default memo(forwardRef(OtpInputContainer));
