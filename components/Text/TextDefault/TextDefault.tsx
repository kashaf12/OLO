import { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';

import color from './styles';

import { COLORS } from '@/constants';
import { textStyles } from '@/utils';

function TextDefault(props: TextDefaultProps) {
  const textColor = props.textColor ? props.textColor : COLORS.fontMainColor;
  const defaultStyle = StyleSheet.flatten([
    color(textColor).color,
    textStyles.Regular,
    textStyles.Normal,
  ]);
  let customStyles = [defaultStyle];

  if (props.thin) customStyles.push(textStyles.Thin);
  if (props.light) customStyles.push(textStyles.Light);
  if (props.bold) customStyles.push(textStyles.Bold);
  if (props.bolder) customStyles.push(textStyles.Bolder);
  if (props.center) customStyles.push(textStyles.Center as any);
  if (props.right) customStyles.push(textStyles.Right as any);
  if (props.small) customStyles.push(textStyles.Small);
  if (props.H5) customStyles.push(textStyles.H5);
  if (props.H4) customStyles.push(textStyles.H4);
  if (props.H3) customStyles.push(textStyles.H3);
  if (props.H2) customStyles.push(textStyles.H2);
  if (props.H1) customStyles.push(textStyles.H1);
  if (props.uppercase) customStyles.push(textStyles.UpperCase as any);

  customStyles = StyleSheet.flatten([customStyles, props.style]);

  return (
    <Text onPress={props?.onPress} numberOfLines={props.numberOfLines ?? 0} style={customStyles}>
      {props.children}
    </Text>
  );
}

type TextDefaultProps = {
  bold: boolean;
  bolder: boolean;
  center: boolean;
  right: boolean;
  small: boolean;
  H5: boolean;
  H4: boolean;
  H3: boolean;
  H2: boolean;
  H1: boolean;
  uppercase: boolean;
  numberOfLines: number;
  textColor: string;
  style: any;
  children: ReactNode;
  thin: boolean;
  light: boolean;
  onPress: () => void;
};
export default TextDefault;
