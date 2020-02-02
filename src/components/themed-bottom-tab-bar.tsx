import * as React from "react";
import { BottomTabBar } from "react-navigation";
import { ktheme } from "../common/theme";
import { ThemeProps } from "../types/theme-props";

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
