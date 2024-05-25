import {
  AntDesign,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { SCREEN, TAB_LABELS } from '@/constants';
import { colors, scale, fontStyles } from '@/utils';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.fontSecondColor,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.bottomTabColor,
        },
        tabBarLabelStyle: {
          fontFamily: fontStyles.Bold,
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          backgroundColor: colors.bottomTabColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <Tabs.Screen
        name={SCREEN.HOME}
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
        name={SCREEN.CHAT}
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
        name={SCREEN.SELL}
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
        name={SCREEN.ADS}
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
        name={SCREEN.PROFILE}
        options={{
          tabBarLabel: TAB_LABELS.PROFILE,
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
