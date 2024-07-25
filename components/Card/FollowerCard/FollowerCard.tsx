import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { FollowerCardProps } from './FollowerCard.types';
import styles from './styles';

import { TextDefault } from '@/components/Text';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function FollowerCard({ onPressUserProfile, name, followers, onPressFollower }: FollowerCardProps) {
  return (
    <>
      <View style={styles.userContainer}>
        <TouchableOpacity
          activeOpacity={1}
          //   onPress={() => navigation.navigate('UserProfile', { user: props._id })}
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
        <BorderlessButton
          style={alignment.Psmall}
          //   onPress={() => (followers ? onModalToggle() : onFollowing())}
          onPress={onPressFollower}>
          {followers ? (
            <Feather name="user-check" size={scale(20)} color="black" />
          ) : (
            <Feather name="user-plus" size={scale(20)} color="black" />
          )}
        </BorderlessButton>
      </View>
    </>
  );
}

export default React.memo(FollowerCard);
