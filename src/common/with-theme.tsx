// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ThemeProps } from "../types/theme-props";

type State = {};

type Props = {
  forwardedRef: React.Ref<Props>;
  theme: ThemeProps;
};

// tslint:disable-next-line:no-any
export const withTheme = (InnerComponent: any): any => {
  return connect((state: { base: { currentTheme: ThemeProps } }) => ({
    theme: state.base.currentTheme
  }))(
    class HOC extends PureComponent<Props, State> {
      static displayName: string = `WithTheme(${InnerComponent.displayName ||
        InnerComponent.name ||
        "Component"})`;

      state: State = {};

      render(): JSX.Element {
        const { forwardedRef, theme, ...props } = this.props;

        return <InnerComponent theme={theme} ref={forwardedRef} {...props} />;
      }
    }
  );
};
