import React from 'react';
import { TouchableOpacity } from 'react-native';

import { IconButtonProps } from './IconButton.types';
import styles from './styles';

import { COLORS } from '@/constants';

function IconButton({ disabled = false, onPress, children }: IconButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        { backgroundColor: disabled ? COLORS.disabled : COLORS.headerbackground },
      ]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

export default React.memo(IconButton);
