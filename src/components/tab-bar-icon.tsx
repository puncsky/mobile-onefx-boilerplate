// @ts-ignore
import * as Icon from "@expo/vector-icons";
import * as React from "react";

import { colors } from "../constants/colors";

interface Props {
  name: string;
  focused: boolean;
}

export class TabBarIcon extends React.Component<Props> {
  public render(): JSX.Element {
    const color = this.props.focused
      ? colors.tabIconSelected
      : colors.tabIconDefault;
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={color}
      />
    );
  }
}
