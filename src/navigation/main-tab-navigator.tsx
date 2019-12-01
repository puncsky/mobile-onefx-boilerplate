import * as React from "react";
import { Platform } from "react-native";
// @ts-ignore
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { TabBarIcon } from "../components/tab-bar-icon";
import { HomeScreen } from "../screens/home-screen";
import { LinksScreen } from "../screens/links-screen";
import { SettingsScreen } from "../screens/settings-screen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name =
      Platform.OS === "ios"
        ? `ios-information-circle${focused ? "" : "-outline"}`
        : "md-information-circle";
    return <TabBarIcon focused={focused} name={name} />;
  }
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name = Platform.OS === "ios" ? "ios-link" : "md-link";
    return <TabBarIcon focused={focused} name={name} />;
  }
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name = Platform.OS === "ios" ? "ios-options" : "md-options";
    return <TabBarIcon focused={focused} name={name} />;
  }
};

export const MainTabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});
