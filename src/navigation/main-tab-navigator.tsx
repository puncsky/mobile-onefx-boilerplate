import * as Haptics from "expo-haptics";
import * as React from "react";
import { Platform } from "react-native";
// @ts-ignore
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenProp
} from "react-navigation";
import { TFuncType } from "../types/screen-props";

import { TabBarIcon } from "../components/tab-bar-icon";
import { HomeScreen } from "../screens/home-screen";
import { LinksScreen } from "../screens/links-screen";
import { MineScreen } from "../screens/mine-screen/mine-screen";
import { SettingsScreen } from "../screens/settings-screen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = ({
  screenProps: { t }
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("home"),
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name =
      Platform.OS === "ios"
        ? `ios-information-circle${focused ? "" : "-outline"}`
        : "md-information-circle";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation
  }: {
    navigation: NavigationScreenProp<{}>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Home");
  }
});

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = ({
  screenProps: { t }
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("links"),
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name = Platform.OS === "ios" ? "ios-link" : "md-link";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation
  }: {
    navigation: NavigationScreenProp<{}>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Links");
  }
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = ({
  screenProps: { t }
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("settings"),
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name = Platform.OS === "ios" ? "ios-options" : "md-options";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation
  }: {
    navigation: NavigationScreenProp<{}>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Settings");
  }
});

const MineStack = createStackNavigator({
  Mine: MineScreen
});

MineStack.navigationOptions = ({
  screenProps: { t }
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("mine"),
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name = Platform.OS === "ios" ? "ios-contact" : "md-contact";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation
  }: {
    navigation: NavigationScreenProp<{}>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Mine");
  }
});

export const MainTabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  MineStack
});
