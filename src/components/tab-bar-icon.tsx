// @ts-ignore
import * as Icon from "@expo/vector-icons";
import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../common/store";
import { ThemeProps } from "../types/theme-props";
interface Props {
  name: string;
  focused: boolean;
  currentTheme: ThemeProps;
}

export const TabBarIcon = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class TabBarIconInner extends React.Component<Props> {
    public render(): JSX.Element {
      const { focused, currentTheme, name } = this.props;
      const color = focused
        ? currentTheme.theme.tabIconSelected
        : currentTheme.theme.tabIconDefault;
      return (
        <Icon.Ionicons
          name={name}
          size={26}
          style={{ marginBottom: -3 }}
          color={color}
        />
      );
    }
  }
);
