import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function ApplicationNavigator() {
  const [isAppReady, setAppReady] = useState(false);
  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    } else {
      //TODO: this should be removed
      setTimeout(() => setAppReady(true), 2000);
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return <MainNavigationStack />;
}

function MainNavigationStack() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
