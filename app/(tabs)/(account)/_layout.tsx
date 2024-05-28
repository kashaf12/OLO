import { Stack } from 'expo-router';

import { BackButton } from '@/components';
import { ACCOUNT_SCREENS, COLORS } from '@/constants';
import { textStyles } from '@/utils';

export default function AccountLayout() {
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
        name={ACCOUNT_SCREENS.MAIN_ACCOUNT}
        options={{
          headerTitle: 'My Account',
        }}
      />
      <Stack.Screen
        name={ACCOUNT_SCREENS.HELP}
        options={{
          headerTitle: 'Help and Support',
        }}
      />
      <Stack.Screen name={ACCOUNT_SCREENS.SETTINGS} />
      <Stack.Screen name={ACCOUNT_SCREENS.PROFILE} />
      <Stack.Screen name={ACCOUNT_SCREENS.PRIVACY} />
      <Stack.Screen name={ACCOUNT_SCREENS.NOTIFICATIONS} />
      <Stack.Screen name={ACCOUNT_SCREENS.HELP_BROWSER} />
      <Stack.Screen
        name={ACCOUNT_SCREENS.NETWORK}
        options={{
          headerTitle: 'My Network',
          headerTitleStyle: {
            color: COLORS.fontMainColor,
          },
        }}
      />
    </Stack>
  );
}
