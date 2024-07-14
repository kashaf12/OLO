import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export interface OtpTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}
