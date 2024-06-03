import { Stack } from 'expo-router';

import { BackButton } from '@/components';
import { ADS_SCREENS, COLORS } from '@/constants';
import { textStyles } from '@/utils';

export default function ChatLayout() {
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
      <Stack.Screen
        name={ADS_SCREENS.MAIN_ADS}
        options={{
          title: 'MY ADS',
          headerStyle: {
            backgroundColor: COLORS.headerbackground,
          },
        }}
      />
    </Stack>
  );
}
