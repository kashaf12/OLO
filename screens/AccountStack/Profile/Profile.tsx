import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ProfileProps } from './Profile.types';
import styles from './styles';

import { ProfilePicture, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function Profile({ name, onPressEditProfile, description = null }: ProfileProps) {
  return (
    <View style={[styles.flex, styles.mainContainer]}>
      <View style={styles.profileContainer}>
        <View style={styles.upperContainer}>
          <ProfilePicture size={scale(90)} style={styles.imageContainer} />
          <View style={[styles.flex, styles.subContainer]}>
            <View style={styles.profileInfo}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.following}
                // onPress={() => navigation.navigate('Network', { screen: 'Following' })}
              >
                <TextDefault textColor={COLORS.fontMainColor} H3 bold>
                  {/* {profile.following.length} */}
                  10
                </TextDefault>
                <TextDefault textColor={COLORS.fontSecondColor} light uppercase>
                  Following
                </TextDefault>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.follower}
                // onPress={() => navigation.navigate('Network', { screen: 'Followers' })}
              >
                <TextDefault textColor={COLORS.fontMainColor} H3 bold>
                  {/* {profile.followers.length} */}
                  20
                </TextDefault>
                <TextDefault textColor={COLORS.fontSecondColor} light uppercase>
                  Followers
                </TextDefault>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={onPressEditProfile}>
              <TextDefault textColor={COLORS.buttonbackground}>Edit Profile</TextDefault>
            </TouchableOpacity>
          </View>
        </View>
        <TextDefault H4 bold style={[alignment.MBxSmall, alignment.PLsmall, alignment.MTsmall]}>
          {name}
        </TextDefault>
        {description && (
          <TextDefault bold style={[alignment.PLsmall]}>
            {description}
          </TextDefault>
        )}
      </View>
    </View>
  );
}

export default React.memo(Profile);
