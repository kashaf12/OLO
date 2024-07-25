import { StyleProp, ViewStyle } from 'react-native';

export type LoadingModalProps = {
  modalVisible?: boolean;
  color?: string;
  title?: string;
  fontFamily?: string;
  darkMode?: boolean;
  modalStyle?: StyleProp<ViewStyle>;
  textStyle?: object;
};
