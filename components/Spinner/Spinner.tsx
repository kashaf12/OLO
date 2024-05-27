import React from 'react';
import { ActivityIndicator } from 'react-native';

import { SpinnerProps } from './Spinner.types';

import { COLORS } from '@/constants';

function Spinner(props: SpinnerProps) {
  return (
    <ActivityIndicator
      animating={props.loading ?? true}
      style={[
        {
          flex: 1,
          backgroundColor: props.backColor ? props.backColor : COLORS.themeBackground,
        },
        props.style,
      ]}
      size={props.size || 'large'}
      color={props.spinnerColor ? props.spinnerColor : COLORS.spinnerColor}
    />
  );
}

export default Spinner;
