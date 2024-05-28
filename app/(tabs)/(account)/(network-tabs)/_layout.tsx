import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

import { COLORS } from '@/constants';
import { NETWORK_SCREENS } from '@/constants/screen';
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
      <MaterialTopTabs.Screen name={NETWORK_SCREENS.FOLLOWING} options={{ title: 'Following' }} />
      <MaterialTopTabs.Screen name={NETWORK_SCREENS.FOLLOWERS} options={{ title: 'Followers' }} />
    </MaterialTopTabs>
  );
}
