import React from "react";
import { Text } from "react-native";
import { ktheme } from "./theme";

export function ListHeader({ children }: { children: string }): JSX.Element {
  return (
    <Text
      style={{
        backgroundColor: ktheme.white,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 14,
        paddingBottom: 8,
        color: ktheme.text01
      }}
    >
      {children}
    </Text>
  );
}
