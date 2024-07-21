import { Redirect, Stack } from 'expo-router';

import { COLORS, LOCATION_SCREENS } from '@/constants';
import { useLocationStore } from '@/store';

export default function LocationLayout() {
  const locationIsSet = useLocationStore((state) => state.isSet);

  if (locationIsSet) return <Redirect href="(tabs)" />;

  return (
    <Stack>
      <Stack.Screen name={LOCATION_SCREENS.CURRENT_LOCATION} options={{ headerShown: false }} />
      <Stack.Screen
        name={LOCATION_SCREENS.SELECT_LOCATION}
        options={{
          headerTitle: 'Set Location',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: COLORS.fontMainColor,
          },
        }}
      />
    </Stack>
  );
}
