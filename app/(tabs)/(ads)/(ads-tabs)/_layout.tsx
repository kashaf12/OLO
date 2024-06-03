import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

import { ADS_TAB_SCREENS, COLORS } from '@/constants';
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
      <MaterialTopTabs.Screen name={ADS_TAB_SCREENS.ADS} />
      <MaterialTopTabs.Screen name={ADS_TAB_SCREENS.FAVOURITE} />
    </MaterialTopTabs>
  );
}
