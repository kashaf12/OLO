import { RefObject } from 'react';
import { TextInput } from 'react-native';

export type RefCallback = (instance: TextInput | null) => void;

export type OtpInputContainerProps = {
  onOtpArrayChange?: (value: string[]) => void;
  otpArray?: string[];
};

export type OtpInputContainerRef = {
  focusInput: (index: number) => void;
  getInputRefs: () => RefObject<TextInput>[];
};
