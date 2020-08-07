// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ThemeProps } from "../types/theme-props";

type Props = {
  forwardedRef: React.Ref<Props>;
  theme: ThemeProps;
};

// tslint:disable-next-line:no-any
export const withTheme = (InnerComponent: any): any => {
  return connect((state: { base: { currentTheme: ThemeProps } }) => ({
    theme: state.base.currentTheme
  }))(
    class HOC extends PureComponent<Props> {
      static displayName = `WithTheme(${InnerComponent.displayName ||
        InnerComponent.name ||
        "Component"})`;

      render(): JSX.Element {
        const { forwardedRef, theme, ...props } = this.props;

        return <InnerComponent theme={theme} ref={forwardedRef} {...props} />;
      }
    }
  );
};
