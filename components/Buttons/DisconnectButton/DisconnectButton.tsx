import React from 'react';
import { TouchableOpacity } from 'react-native';

import { DisconnectButtonProps } from './DisconnectButton.types';
import styles from './styles';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';

function DisconnectButton(props: DisconnectButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled ?? false}
      activeOpacity={0.7}
      style={[styles.emptyButton]}
      onPress={props.onPress}>
      <TextDefault textColor={COLORS.buttonbackground} H4 bolder center>
        {props.title}
      </TextDefault>
    </TouchableOpacity>
  );
}

export default React.memo(DisconnectButton);
