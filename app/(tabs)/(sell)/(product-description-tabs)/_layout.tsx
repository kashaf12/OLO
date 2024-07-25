import { Stack } from 'expo-router';

import { BackButton } from '@/components';
import { COLORS, PRODUCT_DESCRIPTION_SCREENS } from '@/constants';
import { textStyles } from '@/utils';

export default function ProductDescriptionLayout() {
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
      <Stack.Screen name={PRODUCT_DESCRIPTION_SCREENS.PRODUCT_DESCRIPTION} />
      <Stack.Screen name={PRODUCT_DESCRIPTION_SCREENS.FULL_MAP} />
    </Stack>
  );
}
