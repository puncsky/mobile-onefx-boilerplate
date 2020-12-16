import { Appearance } from "react-native-appearance";
import { createTheming, ThemingType } from "@callstack/react-theme-provider";
import { ThemeProps } from "@/types/theme-props";

const colorScheme = Appearance.getColorScheme();
const colorMode = colorScheme === "dark" ? "dark" : "light";

const lightTheme = {
  primary: "#FBB03B",
  secondary: "#0C8DE4",
  white: "#fff",

  black: "#000000",
  black90: "#333333",
  black80: "#999999",
  black60: "#CCCCCC",
  black40: "#E5E5E5",
  black20: "#F0F0F0",
  black10: "#F7F7F7",

  text01: "#4c4c4c", //		Primary text, Body copy

  error: "#E54937", //	Error
  success: "#07A35A", //	Success
  warning: "#FFA000", //	Warning
  information: "#5aaafa", //	Information

  nav01: "#011627", //	Global top bar
  nav02: "#20232a", //	CTA footer

  tabIconDefault: "#ccc",
  tabIconSelected: "#2f95dc",
  activeTintColor: "#2f95dc",
  inactiveTintColor: "#ccc",
  activeBackgroundColor: "#fff",
  inactiveBackgroundColor: "#fff",
  navBg: "#fff",
  navText: "#000"
};

const darkTheme = {
  primary: "#FBB03B",
  secondary: "#0C8DE4",
  white: "#333333",

  black: "#FFF",
  black90: "#333333",
  black80: "#999999",
  black60: "#CCCCCC",
  black40: "#E5E5E5",
  black20: "#F0F0F0",
  black10: "#F7F7F7",

  text01: "#FFFFFF", //		Primary text, Body copy

  error: "#E54937", //	Error
  success: "#07A35A", //	Success
  warning: "#FFA000", //	Warning
  information: "#5aaafa", //	Information

  nav01: "#011627", //	Global top bar
  nav02: "#20232a", //	CTA footer

  tabIconDefault: "#ccc",
  tabIconSelected: "#fbb03b",
  activeTintColor: "#fbb03b",
  inactiveTintColor: "#CFCFCF",
  activeBackgroundColor: "#2E3235",
  inactiveBackgroundColor: "#2E3235",
  navBg: "#2E3235",
  navText: "#fff"
};

const antdLightTheme = {
  color_text_base: lightTheme.text01,
  brand_primary: lightTheme.primary,
  color_link: lightTheme.primary,
  primary_button_fill: lightTheme.primary,
  primary_button_fill_tap: lightTheme.primary
};

const antdDarkTheme = {
  color_text_base: darkTheme.text01,
  brand_primary: darkTheme.primary,
  color_link: darkTheme.primary,
  primary_button_fill: darkTheme.primary,
  primary_button_fill_tap: darkTheme.primary
};

export const themes: { [key: string]: ThemeProps } = {
  light: {
    name: "light",
    colorTheme: lightTheme,
    antdTheme: antdLightTheme,
    sizing: [2, 6, 8, 10, 16, 24, 32]
  },
  dark: {
    name: "dark",
    colorTheme: darkTheme,
    antdTheme: antdDarkTheme,
    sizing: [2, 6, 8, 10, 16, 24, 32]
  }
};

const {
  ThemeProvider,
  withTheme,
  useTheme
}: ThemingType<ThemeProps> = createTheming(themes[colorMode]);

export { ThemeProvider, withTheme, useTheme, colorMode };
