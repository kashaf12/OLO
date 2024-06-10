import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BASE_SCREENS, COLORS } from '@/constants';
import { exitAlert } from '@/utils';
import { useLocationStore } from '@/store';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function ApplicationNavigator() {
  const [isAppReady, setAppReady] = useState(false);
  // const locationIsSet = useLocationStore((state) => state.isSet);
  const locationIsSet = false;

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
        <Stack>
          <Stack.Screen
            name={BASE_SCREENS.AUTHENTICATION}
            options={{
              headerShown: false,
            }}
          />

          {locationIsSet ? (
            <Stack.Screen
              name={BASE_SCREENS.TAB_SCREENS}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name={BASE_SCREENS.LOCATION_SCREENS}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack>
        <FlashMessage position="top" />
      </GestureHandlerRootView>
    </>
  );
}
