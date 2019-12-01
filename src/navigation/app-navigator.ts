import { createSwitchNavigator } from "react-navigation";

import { MainTabNavigator } from "./main-tab-navigator";

export const AppNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator
});
