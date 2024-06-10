import { ViewStyle } from 'react-native';

export type LoginButtonProps = {
  onPress?: () => void;
  onPressIn?: () => void;
  title: string;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  icon: string;
};
