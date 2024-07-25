import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';

export interface DefaultTextButtonProps extends TouchableOpacityProps {
  type?: 'default' | 'link' | 'fill';
  buttonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  text: string;
}
