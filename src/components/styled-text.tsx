import * as React from "react";
import { Component } from "react";
import { Text } from "react-native";

interface Props {
  style?: object;
  children: string;
}

export class MonoText extends Component<Props> {
  public render(): JSX.Element {
    const { children } = this.props;
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: "space-mono" }]}
      >
        {children}
      </Text>
    );
  }
}
