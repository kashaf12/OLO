import { ReactNode } from 'react';

export type IconButtonProps = {
  onPress?: () => void;
  disabled?: boolean;
  children: ReactNode;
};
