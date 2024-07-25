import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BASE_SCREENS, COLORS } from '@/constants';
import { useAuth, useInitializeAuth } from '@/hooks';
import { useLocationStore } from '@/store';
import { exitAlert } from '@/utils';

SplashScreen.preventAutoHideAsync();

export default function ApplicationNavigator() {
  useInitializeAuth(); // This will set up the auth listener
  const [isAppReady, setAppReady] = useState(false);
  const locationIsSet = useLocationStore((state) => state.isSet);
  const { user, isLoading: authLoading, authSkipped } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exitAlert);
    setTimeout(() => setAppReady(true), 2000);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', exitAlert);
    };
  }, []);

  useEffect(() => {
    if (!isAppReady || authLoading) return;

    (async () => {
      await SplashScreen.hideAsync();
    })();

    const inAuthGroup = segments[0] === BASE_SCREENS.AUTHENTICATION;
    const inLocationGroup = segments[0] === BASE_SCREENS.LOCATION_SCREENS;

    if (!user && !authSkipped && !inAuthGroup) {
      router.replace(BASE_SCREENS.AUTHENTICATION);
    } else if ((user || authSkipped) && !locationIsSet && !inLocationGroup) {
      router.replace(BASE_SCREENS.LOCATION_SCREENS);
    } else if ((user || authSkipped) && locationIsSet && (inAuthGroup || inLocationGroup)) {
      router.replace(BASE_SCREENS.TAB_SCREENS);
    }
  }, [isAppReady, authLoading, user, locationIsSet, segments, authSkipped]);

  if (!isAppReady || authLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StatusBar style="dark" backgroundColor={COLORS.primary} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name={BASE_SCREENS.AUTHENTICATION} />
          <Stack.Screen name={BASE_SCREENS.LOCATION_SCREENS} />
          <Stack.Screen name={BASE_SCREENS.TAB_SCREENS} />
        </Stack>
        <FlashMessage position="top" />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
