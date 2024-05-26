import { Stack } from 'expo-router';

import { LOCATION_SCREENS } from '@/constants';

export default function LocationLayout() {
  return (
    <Stack>
      <Stack.Screen name={LOCATION_SCREENS.CURRENT_LOCATION} options={{ headerShown: false }} />
      <Stack.Screen name={LOCATION_SCREENS.SELECT_LOCATION} />
    </Stack>
  );
}
