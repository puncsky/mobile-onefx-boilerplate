import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation-param";

import { MainTabNavigator } from "@/common/navigation/main-tab-navigator";
// import { ReferralScreen } from "@/screens/referral-screen/referral-screen";
// import { InviteScreen } from "@/screens/referral-screen/invite-screen";

// const RootScreen = createSwitchNavigator({
//   Main: MainTabNavigator
// });

// const AppRoot = createStackNavigator(
//   {
//     Root: {
//       screen: RootScreen,
//       navigationOptions: {
//         header: null
//       }
//     },
//     Referral: ReferralScreen,
//     Invite: InviteScreen
//   },
//   {
//     headerMode: "none"
//   }
// );

// export const AppNavigator = createAppContainer(AppRoot);

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={MainTabNavigator} />
      {/* <Stack.Screen name="Referral" component={ReferralScreen} />
      <Stack.Screen name="Invite" component={InviteScreen} /> */}
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
