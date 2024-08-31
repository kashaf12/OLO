import { Stack } from 'expo-router';

import { LeftButton } from '@/components';
import { COLORS, SELL_SCREENS } from '@/constants';
import { textStyles } from '@/utils';

export default function SellLayout() {
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
        headerLeft: () => <LeftButton iconColor={COLORS.headerText} icon="leftArrow" />,
      }}>
      <Stack.Screen name={SELL_SCREENS.SELL} />
    </Stack>
  );
}
