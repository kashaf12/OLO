import { Stack } from 'expo-router';

import { BackButton } from '@/components';
import { CHAT_SCREENS, COLORS } from '@/constants';
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
        name={CHAT_SCREENS.MAIN_CHAT}
        options={{
          headerTitle: 'Inbox',
          headerStyle: {
            backgroundColor: COLORS.headerbackground,
          },
        }}
      />
      <Stack.Screen
        name={CHAT_SCREENS.LIVE_CHAT}
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
