import * as React from "react";
import { BottomTabBar } from "react-navigation";
import { connect } from "react-redux";
import { AppState } from "../common/store";
import { ThemeProps } from "../types/theme-props";

type Props = {
  currentTheme: ThemeProps;
};

export const ThemedBottomTabBar = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class ThemedBottomTabBarInner extends React.Component<Props> {
    public render(): JSX.Element {
      const { currentTheme } = this.props;
      return (
        //@ts-ignore
        <BottomTabBar
          {...this.props}
          activeTintColor={currentTheme.theme.activeTintColor}
          inactiveTintColor={currentTheme.theme.inactiveTintColor}
          style={{
            backgroundColor: currentTheme.theme.activeBackgroundColor
          }}
        />
      );
    }
  }
);
