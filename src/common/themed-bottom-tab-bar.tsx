import * as React from "react";
import {
  BottomTabBar,
  BottomTabBarOptions,
  BottomTabBarProps
} from "@react-navigation/bottom-tabs";

import { useTheme } from "@/common/theme";

export function ThemedBottomTabBar(
  props: BottomTabBarProps<BottomTabBarOptions>
): JSX.Element {
  const theme = useTheme();
  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.colorTheme.activeTintColor}
      inactiveTintColor={theme.colorTheme.inactiveTintColor}
      style={{
        backgroundColor: theme.colorTheme.activeBackgroundColor
      }}
    />
  );
}
