import { Stack } from 'expo-router';

import { AUTH_SCREENS, COLORS } from '@/constants';
import { scale } from '@/utils';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name={AUTH_SCREENS.AUTH_PAGE} options={{ headerShown: false }} />
      <Stack.Screen
        name={AUTH_SCREENS.OTP_PAGE}
        options={{
          headerTitle: 'OTP Verification',
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerBackTitleStyle: {
            fontSize: scale(20),
          },
          headerStyle: {
            backgroundColor: COLORS.themeBackground,
          },
        }}
      />
    </Stack>
  );
}
