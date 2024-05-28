import { useRouter } from 'expo-router';
import React from 'react';
import { Share } from 'react-native';

import { FlashMessage } from '@/components';
import { ACCOUNT_SCREENS } from '@/constants';
import { Help } from '@/screens';

async function share() {
  try {
    const result = await Share.share({
      title: 'App link',
      message: 'Install this app and enjoy your friend community',
    });
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
    if (error instanceof Error) {
      FlashMessage({ message: error.message, type: 'warning' });
    }
  }
}

const Page = () => {
  const router = useRouter();
  return (
    <Help
      onPressShare={share}
      onPressHelpBrowser={() => router.navigate(ACCOUNT_SCREENS.HELP_BROWSER)}
    />
  );
};

export default Page;
