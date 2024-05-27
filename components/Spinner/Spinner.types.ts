import { StyleProp, ViewStyle } from 'react-native';

export type SpinnerProps = {
  backColor: string;
  spinnerColor: string;
  size?: number | 'small' | 'large' | undefined;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};
