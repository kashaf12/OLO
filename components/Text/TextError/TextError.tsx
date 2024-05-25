import React from 'react';
import { View } from 'react-native';

import { COLORS } from '@/constants';

import TextDefault from '../TextDefault/TextDefault';

function TextError(props: TextErrorProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.backColor ? props.backColor : COLORS.containerDark,
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

type TextErrorProps = {
  text: string;
  backColor: string;
  textColor: string;
  style: any;
};
export default TextError;
