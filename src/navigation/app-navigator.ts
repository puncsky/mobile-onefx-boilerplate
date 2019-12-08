import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { MainTabNavigator } from "./main-tab-navigator";

const RootScreen = createSwitchNavigator({
  Main: MainTabNavigator
});

const AppRoot = createSwitchNavigator({
  Root: {
    screen: RootScreen,
    navigationOptions: {
      header: null
    }
  }
});

export const AppNavigator = createAppContainer(AppRoot);
