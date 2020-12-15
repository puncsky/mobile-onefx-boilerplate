import * as Haptics from "expo-haptics";
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

import { TFuncType } from "@/types/screen-props";

import { HomeScreen } from "@/screens/home-screen";
import { LinksScreen } from "@/screens/links-screen";
import { MineScreen } from "@/screens/mine-screen/mine-screen";
import { SettingsScreen } from "@/screens/settings-screen";
import { TabBarIcon } from "@/common/tab-bar-icon";

// const HomeStack = createStackNavigator(
//   {
//     Home: HomeScreen
//   },
//   {
//     headerMode: "none"
//   }
// );

// HomeStack.navigationOptions = ({
//   screenProps: { t }
// }: {
//   screenProps: { t: TFuncType };
// }) => ({
//   tabBarLabel: t("home"),
//   tabBarIcon: function TabBarIconWrapper({ focused }: { focused: boolean }) {
//     const name =
//       Platform.OS === "ios"
//         ? `ios-information-circle${focused ? "" : "-outline"}`
//         : "md-information-circle";
//     return <TabBarIcon focused={focused} name={name} />;
//   },
//   tabBarOnPress: async ({
//     navigation
//   }: {
//     navigation: NavigationScreenProp<unknown>;
//   }) => {
//     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     navigation.navigate("Home");
//   }
// });

// const LinksStack = createStackNavigator(
//   {
//     Links: LinksScreen
//   },
//   {
//     headerMode: "none"
//   }
// );

// LinksStack.navigationOptions = ({
//   screenProps: { t }
// }: {
//   screenProps: { t: TFuncType };
// }) => ({
//   tabBarLabel: t("links"),
//   tabBarIcon: function TabBarIconWrapper({ focused }: { focused: boolean }) {
//     const name = Platform.OS === "ios" ? "ios-link" : "md-link";
//     return <TabBarIcon focused={focused} name={name} />;
//   },
//   tabBarOnPress: async ({
//     navigation
//   }: {
//     navigation: NavigationScreenProp<unknown>;
//   }) => {
//     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     navigation.navigate("Links");
//   }
// });

// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen
//   },
//   {
//     headerMode: "none"
//   }
// );

// SettingsStack.navigationOptions = ({
//   screenProps: { t }
// }: {
//   screenProps: { t: TFuncType };
// }) => ({
//   tabBarLabel: t("settings"),
//   tabBarIcon: function TabBarIconWrapper({ focused }: { focused: boolean }) {
//     const name = Platform.OS === "ios" ? "ios-options" : "md-options";
//     return <TabBarIcon focused={focused} name={name} />;
//   },
//   tabBarOnPress: async ({
//     navigation
//   }: {
//     navigation: NavigationScreenProp<unknown>;
//   }) => {
//     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     navigation.navigate("Settings");
//   }
// });

// const MineStack = createStackNavigator(
//   {
//     Mine: MineScreen
//   },
//   {
//     headerMode: "none"
//   }
// );

// MineStack.navigationOptions = ({
//   screenProps: { t }
// }: {
//   screenProps: { t: TFuncType };
// }) => ({
//   tabBarLabel: t("mine"),
//   tabBarIcon: function TabBarIconWrapper({ focused }: { focused: boolean }) {
//     const name = Platform.OS === "ios" ? "ios-contact" : "md-contact";
//     return <TabBarIcon focused={focused} name={name} />;
//   },
//   tabBarOnPress: async ({
//     navigation
//   }: {
//     navigation: NavigationScreenProp<unknown>;
//   }) => {
//     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     navigation.navigate("Mine");
//   }
// });

// export const MainTabNavigator = createBottomTabNavigator(
//   {
//     HomeStack,
//     LinksStack,
//     // SettingsStack,
//     MineStack
//   },
//   {
//     navigationOptions: {
//       header: null
//     },
//     tabBarComponent: function tabBarComponent(props) {
//       return <ThemedBottomTabBar {...props} />;
//     }
//   }
// );

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
  return (
    <MainTab.Navigator
      tabBar={props => <ThemedBottomTabBar {...props} />}
      initialRouteName="Home"
    >
      <MainTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
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
          tabBarIcon: ({ focused }) => {
            const name = Platform.OS === "ios" ? "ios-apps" : "md-apps";
            return <TabBarIcon name={name} focused={focused} />;
          }
        }}
      />
    </MainTab.Navigator>
  );
}
