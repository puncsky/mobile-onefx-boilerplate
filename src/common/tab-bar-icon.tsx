import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { theme } from "@/common/theme";

interface Props {
  name: string;
  focused: boolean;
}

export function TabBarIcon(props: Props) {
  const { focused, name } = props;
  const color = focused ? theme.tabIconSelected : theme.tabIconDefault;
  return (
    <Ionicons
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={color}
    />
  );
}
