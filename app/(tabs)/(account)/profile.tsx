import { Href, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Share } from 'react-native';

import { FlashMessage, RightButton } from '@/components';
import { ACCOUNT_SCREENS, COLORS } from '@/constants';
import { Profile } from '@/screens';
import { useUserInfoStore } from '@/store';

const Page = () => {
  const isLoading = useUserInfoStore((state) => state.isLoading);
  const user = useUserInfoStore((state) => state.userInfo);
  const router = useRouter();
  const navigation = useNavigation();

  async function share() {
    //console.log('share')
    try {
      const result = await Share.share({
        title: 'App link',
        message: 'Install this app and enjoy your friend community',
      });
      //console.log("Share Action", result.action, Share.sharedAction)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          FlashMessage({ message: 'The invitation has been sent', type: 'success' });
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        FlashMessage({ message: error.message, type: 'warning' });
      }
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: null,
      headerRight: () => <RightButton share={share} iconColor={COLORS.headerText} icon="dots" />,
    });
  }, [navigation]);

  return (
    <Profile
      name={isLoading ? 'Loading...' : user?.displayName || ''}
      onPressEditProfile={() => router.navigate(ACCOUNT_SCREENS.EDIT_PROFILE as Href)}
      profilePhotoUrl={user?.profilePhotoUrl}
      description={user?.description}
    />
  );
};

export default Page;
