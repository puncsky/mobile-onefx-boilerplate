import * as React from "react";
import {
  BottomTabBar,
  BottomTabBarOptions,
  BottomTabBarProps
} from "@react-navigation/bottom-tabs";
import { theme } from "@/common/theme";

export function ThemedBottomTabBar(
  props: BottomTabBarProps<BottomTabBarOptions>
): JSX.Element {
  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.activeTintColor}
      inactiveTintColor={theme.inactiveTintColor}
      style={{
        backgroundColor: theme.activeBackgroundColor
      }}
    />
  );
}
