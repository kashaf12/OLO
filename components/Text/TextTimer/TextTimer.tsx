import React from 'react';

import { TextTimerProps } from './TextTimer.types';
import styles from './styles';
import TextDefault from '../TextDefault';

const TextTimer = ({ text, time }: TextTimerProps) => {
  return (
    <TextDefault style={styles.containerStyle}>
      {text}
      <TextDefault style={styles.textStyle}>{` ${time}s`}</TextDefault>
    </TextDefault>
  );
};

export default TextTimer;
