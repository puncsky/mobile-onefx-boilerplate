import * as React from "react";
import { Text as DefaultText } from "react-native";

import { themes } from "./theme";
import useColorScheme from "./hooks/use-color-scheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof themes.light.colorTheme &
    keyof typeof themes.dark.colorTheme
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  const { colorTheme } = themes[theme];
  return colorTheme[colorName];
}

type TextThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = TextThemeProps & DefaultText["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text01");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
