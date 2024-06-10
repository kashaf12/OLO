import React from 'react';
import { TouchableOpacity } from 'react-native';

import { SkipButtonProps } from './SkipButton.types';
import styles from './styles';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';

function SkipButton({ disabled = false, onPress, title = 'Skip' }: SkipButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        { backgroundColor: disabled ? COLORS.disabled : COLORS.headerbackground },
      ]}
      onPress={onPress}>
      <TextDefault textColor={disabled ? COLORS.fontSecondColor : COLORS.primary} H4 bolder center>
        {title}
      </TextDefault>
    </TouchableOpacity>
  );
}

export default React.memo(SkipButton);
