import * as React from "react";
import { BottomTabBar } from "react-navigation";
import { ThemeProps } from "../types/theme-props";
import { ktheme } from "./theme";

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
        activeTintColor={ktheme.activeTintColor}
        inactiveTintColor={ktheme.inactiveTintColor}
        style={{
          backgroundColor: ktheme.activeBackgroundColor
        }}
      />
    );
  }
};
