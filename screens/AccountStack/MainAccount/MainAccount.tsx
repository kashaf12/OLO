import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { MainAccountProps } from './MainAccount.types';
import styles from './styles';

import { EmptyButton, ProfilePicture, TextDefault } from '@/components';
import { COLORS } from '@/constants';
import { alignment, scale } from '@/utils';

function MainAccount({
  onPressHelp,
  onPressSettings,
  onPressProfile,
  onPressNetwork,
  isAuthenticated,
  userName,
  onPressLogin,
  description = null,
}: MainAccountProps) {
  return (
    <View style={[styles.flex, styles.container]}>
      <View style={styles.profileContainer}>
        <ProfilePicture size={scale(90)} style={styles.imageContainer} />
        <View style={[styles.flex, styles.profileInfo]}>
          <TextDefault H4 bold>
            {!isAuthenticated ? 'Log in' : userName}
          </TextDefault>
          {isAuthenticated && description && <TextDefault>{description}</TextDefault>}
          <TouchableOpacity
            activeOpacity={0.5}
            style={[alignment.PBxSmall, alignment.MTmedium]}
            onPress={isAuthenticated ? onPressProfile : onPressLogin}>
            <TextDefault textColor={COLORS.spinnerColor} H5 bold>
              {!isAuthenticated ? 'Log in to your account' : 'Go to Profile'}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
      {isAuthenticated && (
        <>
          <TouchableOpacity
            style={styles.smallContainer}
            onPress={onPressNetwork}
            //   onPress={() => navigation.navigate('Network')}
          >
            <FontAwesome5 name="users" size={scale(20)} color={COLORS.buttonbackground} />
            <View style={[styles.flex]}>
              <TextDefault bold H5 style={alignment.PLlarge}>
                My Network
              </TextDefault>
              <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                Followers, following and find friends
              </TextDefault>
            </View>
            <Entypo name="chevron-small-right" size={scale(30)} color={COLORS.buttonbackground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallContainer} onPress={onPressSettings}>
            <AntDesign name="setting" size={scale(22)} color={COLORS.buttonbackground} />
            <View style={[styles.flex]}>
              <TextDefault bold H5 style={alignment.PLlarge}>
                Settings
              </TextDefault>
              <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
                Privacy and logout
              </TextDefault>
            </View>
            <Entypo name="chevron-small-right" size={scale(30)} color={COLORS.buttonbackground} />
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.smallContainer} onPress={onPressHelp}>
        <Ionicons name="help-circle-outline" size={scale(22)} color={COLORS.buttonbackground} />
        <View style={[styles.flex]}>
          <TextDefault bold H5 style={alignment.PLlarge}>
            Help and Support
          </TextDefault>
          <TextDefault light style={[alignment.PLlarge, alignment.MTxSmall]}>
            Help center, Terms and conditions, Privacy policy
          </TextDefault>
        </View>
        <Entypo name="chevron-small-right" size={scale(30)} color={COLORS.buttonbackground} />
      </TouchableOpacity>
      {!isAuthenticated && (
        <View style={styles.loginBtn}>
          <EmptyButton title="Login or register" onPress={onPressLogin} />
        </View>
      )}
    </View>
  );
}

export default MainAccount;
