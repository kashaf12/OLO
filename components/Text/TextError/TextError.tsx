import React from 'react';
import { View } from 'react-native';

import { TextErrorProps } from './TextError.types';
import TextDefault from '../TextDefault';

import { COLORS } from '@/constants';

function TextError(props: TextErrorProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.backColor ? props.backColor : COLORS.dark,
      }}>
      <TextDefault
        style={props.style}
        textColor={props.textColor ? props.textColor : COLORS.fontMainColor}
        bold
        H5
        center>
        {props.text}{' '}
      </TextDefault>
    </View>
  );
}

export default TextError;
