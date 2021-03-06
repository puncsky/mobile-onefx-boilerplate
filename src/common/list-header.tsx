import React from "react";
import { Text } from "react-native";
import { useTheme } from "@/common/theme";

export function ListHeader({ children }: { children: string }): JSX.Element {
  const theme = useTheme();
  return (
    <Text
      style={{
        backgroundColor: theme.colorTheme.white,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 14,
        paddingBottom: 8,
        color: theme.colorTheme.text01
      }}
    >
      {children}
    </Text>
  );
}
