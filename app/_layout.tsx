import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { COLORS } from '@/constants';
import { exitAlert } from '@/utils';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function ApplicationNavigator() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exitAlert);
    //TODO: remove it
    setTimeout(() => setAppReady(true), 2000);
    // setAppReady(true);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', exitAlert);
    };
  }, []);

  useEffect(() => {
    if (!isAppReady) return;
    (async () => {
      await SplashScreen.hideAsync();
    })();
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView>
        <StatusBar style="dark" backgroundColor={COLORS.primary} />
        <Slot />
        <FlashMessage position="top" />
      </GestureHandlerRootView>
    </>
  );
}
