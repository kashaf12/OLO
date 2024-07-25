import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

import { COLORS, INBOX_SCREENS } from '@/constants';
import { scale } from '@/utils';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.fontMainColor,
        tabBarInactiveTintColor: COLORS.fontSecondColor,
        tabBarStyle: {
          backgroundColor: COLORS.headerbackground,
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.buttonbackground,
          height: scale(2),
        },
      }}>
      <MaterialTopTabs.Screen name={INBOX_SCREENS.ALL} options={{ title: 'ALL' }} />
      <MaterialTopTabs.Screen name={INBOX_SCREENS.BUYING} options={{ title: 'BUYING' }} />
      <MaterialTopTabs.Screen name={INBOX_SCREENS.SELLING} options={{ title: 'SELLING' }} />
    </MaterialTopTabs>
  );
}
