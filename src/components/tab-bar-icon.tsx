// @ts-ignore
import * as Icon from "@expo/vector-icons";
import * as React from "react";

import Colors from "../constants/colors";

interface Props {
  name: string;
  focused: boolean;
}

export default class TabBarIcon extends React.Component<Props> {
  public render(): JSX.Element {
    const color = this.props.focused
      ? Colors.tabIconSelected
      : Colors.tabIconDefault;
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
