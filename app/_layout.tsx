import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import { COLORS } from '@/constants';
import { useLocationStore } from '@/store';
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
      <StatusBar style="dark" backgroundColor={COLORS.primary} />
      <MainNavigationStack />
    </>
  );
}

function MainNavigationStack() {
  // const use;
  const location = useLocationStore((state) => state.location);
  const router = useRouter();

  useEffect(() => {
    if (!location) {
      router.push('(location)');
    }
  }, [location]);

  return (
    <Stack>
      <Stack.Screen name="(location)" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
