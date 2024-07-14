import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';

import { DefaultTextButtonProps } from './DefaultTextButton.types';
import styles from './styles';

import { COLORS } from '@/constants';

const DefaultTextButton = function ({
  type = 'default',
  buttonStyle,
  disabled,
  textStyle,
  text,
  ...rest
}: DefaultTextButtonProps) {
  const style: StyleProp<ViewStyle> = {};
  if (type === 'fill') {
    style.backgroundColor = COLORS.primary;
    style.borderWidth = 0;
  } else if (type === 'default') {
    style.borderColor = COLORS.primary;
  } else if (type === 'link') {
    style.borderWidth = 0;
  }
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.buttonStyle, style, buttonStyle, disabled ? styles.disabled : {}]}>
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DefaultTextButton;
