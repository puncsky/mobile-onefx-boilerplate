import * as React from "react";
import { BottomTabBar } from "react-navigation";
import { ThemeProps } from "../types/theme-props";
import { theme } from "./theme";

type Props = {
  currentTheme: ThemeProps;
};

export const ThemedBottomTabBar = class ThemedBottomTabBarInner extends React.Component<
  Props
> {
  public render(): JSX.Element {
    return (
      //@ts-ignore
      <BottomTabBar
        {...this.props}
        activeTintColor={theme.activeTintColor}
        inactiveTintColor={theme.inactiveTintColor}
        style={{
          backgroundColor: theme.activeBackgroundColor
        }}
      />
    );
  }
};
