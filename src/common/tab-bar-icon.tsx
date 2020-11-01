import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { useTheme } from "@/common/theme";

interface Props {
  name: string;
  focused: boolean;
}

export function TabBarIcon(props: Props) {
  const { focused, name } = props;
  const theme = useTheme();
  const color = focused ? theme.tabIconSelected : theme.tabIconDefault;
  return (
    <Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={color}
    />
  );
}
