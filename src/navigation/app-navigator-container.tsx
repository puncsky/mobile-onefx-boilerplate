import AntdProvider from "@ant-design/react-native/lib/provider";
import { Scope, TranslateOptions } from "i18n-js";
import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../common/store";
import { i18n } from "../translations";
import { ThemeProps } from "../types/theme-props";
import { AppNavigator } from "./app-navigator";

type InnerProps = {
  locale: string;
  currentTheme: ThemeProps;
};
type InnerState = {
  locale: string;
};

export const AppNavigatorContainer = connect((state: AppState) => {
  return { locale: state.base.locale, currentTheme: state.base.currentTheme };
})(
  class AppNavigatorContainerInner extends React.Component<
    InnerProps,
    InnerState
  > {
    state: InnerState = {
      locale: this.props.locale
    };

    setLocale = (locale: string) => {
      this.setState({ locale });
    };

    t = (scope: Scope, options: TranslateOptions) => {
      return i18n.t(scope, { locale: this.state.locale, ...options });
    };

    render(): JSX.Element {
      const { currentTheme, locale } = this.props;
      return (
        <AntdProvider theme={currentTheme.antdTheme}>
          <AppNavigator
            screenProps={{
              t: this.t,
              locale,
              currentTheme,
              setLocale: this.setLocale
            }}
          />
        </AntdProvider>
      );
    }
  }
);
