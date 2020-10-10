import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import { MainTabNavigator } from "@/common/navigation/main-tab-navigator";
import { ReferralScreen } from "@/screens/referral-screen/referral-screen";
import { InviteScreen } from "@/screens/referral-screen/invite-screen";

const RootScreen = createSwitchNavigator({
  Main: MainTabNavigator
});

const AppRoot = createStackNavigator(
  {
    Root: {
      screen: RootScreen,
      navigationOptions: {
        header: null
      }
    },
    Referral: ReferralScreen,
    Invite: InviteScreen
  },
  {
    headerMode: "none"
  }
);

export const AppNavigator = createAppContainer(AppRoot);
