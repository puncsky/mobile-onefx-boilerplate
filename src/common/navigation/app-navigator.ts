import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import { MainTabNavigator } from "@/common/navigation/main-tab-navigator";

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
    }
  },
  {
    headerMode: "none"
  }
);

export const AppNavigator = createAppContainer(AppRoot);
