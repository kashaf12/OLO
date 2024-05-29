import { Stack } from 'expo-router';

import { BackButton } from '@/components';
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
        headerLeft: () => <BackButton iconColor={COLORS.headerText} icon="leftArrow" />,
      }}>
      <Stack.Screen name={SELL_SCREENS.SELL} />
      <Stack.Screen name={SELL_SCREENS.CATEGORIES} options={{ title: 'Choose a category' }} />
      <Stack.Screen name={SELL_SCREENS.SUB_CATEGORIES} />
      <Stack.Screen name={SELL_SCREENS.SELLING_FORM} options={{ title: 'Include some details' }} />
      <Stack.Screen name={SELL_SCREENS.UPLOAD_IMAGE} />
      <Stack.Screen name={SELL_SCREENS.PRICE} />
      <Stack.Screen name={SELL_SCREENS.LOCATION_CONFIRM} />
      <Stack.Screen name={SELL_SCREENS.FULL_MAP} />
      <Stack.Screen name={SELL_SCREENS.PRODUCT_DESCRIPTION} options={{ headerShown: false }} />
    </Stack>
  );
}
