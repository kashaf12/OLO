import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

import { LoginButtonProps } from './LoginButton.types';
import styles from './styles';
import { Spinner } from '../../Spinner';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function LoginButton({
  disabled = false,
  style,
  onPressIn,
  onPress,
  loading,
  icon,
  title,
}: LoginButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={StyleSheet.compose(styles.emptyButton, style)}
      onPressIn={onPressIn}
      onPress={onPress}>
      {loading && (
        <View>
          <Spinner />
        </View>
      )}
      {!loading && (
        <>
          {icon && (
            <SimpleLineIcons name={icon as any} size={scale(20)} color={COLORS.buttonbackground} />
          )}
          <TextDefault textColor={COLORS.buttonbackground} H4 style={alignment.PLxSmall}>
            {title}
          </TextDefault>
        </>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(LoginButton);
