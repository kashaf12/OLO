import {
  AntDesign,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';

import { COLORS, FONT_STYLES, TAB_SCREENS, TAB_LABELS } from '@/constants';
import { useLocationStore } from '@/store';
import { scale } from '@/utils';

export default function TabLayout() {
  const locationIsSet = useLocationStore((state) => state.isSet);

  if (!locationIsSet) {
    return <Redirect href="(location)" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.fontSecondColor,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.bottomTabColor,
        },
        tabBarLabelStyle: {
          fontFamily: FONT_STYLES.Bold,
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          backgroundColor: COLORS.bottomTabColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name={TAB_SCREENS.HOME}
        options={{
          tabBarLabel: TAB_LABELS.HOME,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Fontisto name="home" size={scale(21)} color={color} />
            ) : (
              <SimpleLineIcons name="home" size={scale(21)} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name={TAB_SCREENS.CHAT}
        options={{
          tabBarLabel: TAB_LABELS.CHAT,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialCommunityIcons name="chat" size={scale(25)} color={color} />
            ) : (
              <SimpleLineIcons name="bubble" size={scale(20)} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name={TAB_SCREENS.SELL}
        options={{
          tabBarLabel: TAB_LABELS.SELL,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <AntDesign name="pluscircle" size={scale(22)} color={color} />
            ) : (
              <SimpleLineIcons name="plus" size={scale(22)} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name={TAB_SCREENS.ADS}
        options={{
          tabBarLabel: TAB_LABELS.ADS,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <AntDesign name="heart" size={scale(21)} color={color} />
            ) : (
              <SimpleLineIcons name="heart" size={scale(21)} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name={TAB_SCREENS.ACCOUNT}
        options={{
          tabBarLabel: TAB_LABELS.ACCOUNT,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={scale(25)} color={color} />
            ) : (
              <SimpleLineIcons name="user" size={scale(25)} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}
