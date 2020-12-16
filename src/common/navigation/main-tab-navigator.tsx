import * as React from "react";
import { Platform } from "react-native";
import {
  HomeParamList,
  LinkParamList,
  MineParamList,
  MainTabParamList
} from "@/types/navigation-param";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemedBottomTabBar } from "@/common/themed-bottom-tab-bar";

import { HomeScreen } from "@/screens/home-screen";
import { LinksScreen } from "@/screens/links-screen";
import { MineScreen } from "@/screens/mine-screen/mine-screen";
import { TabBarIcon } from "@/common/tab-bar-icon";
import { LocalizationContext } from "@/translations";

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const LinkStack = createStackNavigator<LinkParamList>();

function LinkNavigator() {
  return (
    <LinkStack.Navigator screenOptions={{ headerShown: false }}>
      <LinkStack.Screen name="LinkScreen" component={LinksScreen} />
    </LinkStack.Navigator>
  );
}

const MineStack = createStackNavigator<MineParamList>();

function MineNavigator() {
  return (
    <MineStack.Navigator screenOptions={{ headerShown: false }}>
      <MineStack.Screen name="MineScreen" component={MineScreen} />
    </MineStack.Navigator>
  );
}

const MainTab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const { t } = React.useContext(LocalizationContext);
  return (
    <MainTab.Navigator
      tabBar={props => <ThemedBottomTabBar {...props} />}
      initialRouteName="Home"
    >
      <MainTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: t("home"),
          tabBarIcon: ({ focused }) => {
            const name =
              Platform.OS === "ios"
                ? `ios-information-circle${focused ? "" : "-outline"}`
                : "md-information-circle";
            return <TabBarIcon name={name} focused={focused} />;
          }
        }}
      />
      <MainTab.Screen
        name="Link"
        component={LinkNavigator}
        options={{
          tabBarLabel: t("links"),
          tabBarIcon: ({ focused }) => {
            const name = Platform.OS === "ios" ? "ios-link" : "md-link";
            return <TabBarIcon name={name} focused={focused} />;
          }
        }}
      />
      <MainTab.Screen
        name="Mine"
        component={MineNavigator}
        options={{
          tabBarLabel: t("mine"),
          tabBarIcon: ({ focused }) => {
            const name = Platform.OS === "ios" ? "ios-apps" : "md-apps";
            return <TabBarIcon name={name} focused={focused} />;
          }
        }}
      />
    </MainTab.Navigator>
  );
}
