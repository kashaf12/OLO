import React from 'react';
import { TouchableOpacity } from 'react-native';

import { EmptyButtonProps } from './EmptyButton.types';
import styles from './styles';
import { Spinner } from '../../Spinner';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';

function EmptyButton(props: EmptyButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled ?? false}
      activeOpacity={0.7}
      style={[
        styles.emptyButton,
        { backgroundColor: props.disabled ? COLORS.disabled : COLORS.buttonbackground },
      ]}
      onPress={props.onPress}>
      {props.loading ? (
        <Spinner spinnerColor={COLORS.white} backColor="transparent" />
      ) : (
        <TextDefault
          textColor={props.disabled ? COLORS.fontSecondColor : COLORS.buttonText}
          H4
          bolder
          center>
          {props.title}
        </TextDefault>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(EmptyButton);
