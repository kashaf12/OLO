import { Stack } from 'expo-router';

import { AUTH_SCREENS } from '@/constants';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name={AUTH_SCREENS.AUTH_PAGE} options={{ headerShown: false }} />
      <Stack.Screen
        name={AUTH_SCREENS.OTP_PAGE}
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
