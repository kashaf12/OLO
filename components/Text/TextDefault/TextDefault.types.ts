import { ReactNode } from 'react';

export type TextDefaultProps = {
  bold?: boolean;
  bolder?: boolean;
  center?: boolean;
  right?: boolean;
  small?: boolean;
  H5?: boolean;
  H4?: boolean;
  H3?: boolean;
  H2?: boolean;
  H1?: boolean;
  uppercase?: boolean;
  numberOfLines?: number;
  textColor?: string;
  style?: any;
  children: ReactNode;
  thin?: boolean;
  light?: boolean;
  onPress?: () => void;
};
