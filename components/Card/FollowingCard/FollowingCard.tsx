import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { FollowingCardProps } from './FollowingCard.types';
import styles from './styles';
import { TextDefault } from '../../Text';

import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function Card({ onPressUserProfile, name, onPressModalToggle }: FollowingCardProps) {
  return (
    <>
      <View style={styles.userContainer}>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => navigation.navigate('UserProfile', { user: props._id })}
          onPress={onPressUserProfile}
          style={styles.avatar}>
          <Image style={styles.img} source={require('@/assets/avatar.png')} />
        </TouchableOpacity>
        <TextDefault
          textColor={COLORS.buttonbackground}
          bold
          style={[alignment.PLmedium, styles.flex]}>
          {name}
        </TextDefault>
        <BorderlessButton style={alignment.Psmall} onPress={onPressModalToggle}>
          <Feather name="user-check" size={scale(20)} color="black" />
        </BorderlessButton>
      </View>
    </>
  );
}

export default React.memo(Card);
