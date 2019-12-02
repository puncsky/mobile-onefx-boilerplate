import { createSwitchNavigator } from "react-navigation";

import { MainTabNavigator } from "./main-tab-navigator";

const RootScreen = createSwitchNavigator({
  Main: MainTabNavigator
});

export const AppNavigator = createSwitchNavigator({
  Root: {
    screen: RootScreen,
    navigationOptions: {
      header: null
    }
  }
});
