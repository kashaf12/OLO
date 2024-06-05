import { Stack } from 'expo-router';

import { BackButton } from '@/components';
import { COLORS, HOME_SCREENS } from '@/constants';
import { textStyles } from '@/utils';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: COLORS.headerbackground,
        },
        headerTitleStyle: {
          color: COLORS.headerText,
          ...textStyles.H3,
          ...textStyles.Bold,
        },
        headerLeft: () => <BackButton iconColor={COLORS.headerText} icon="leftArrow" />,
      }}>
      <Stack.Screen name={HOME_SCREENS.MAIN} />
    </Stack>
  );
}
