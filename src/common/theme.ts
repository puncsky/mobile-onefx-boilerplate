import { Appearance } from "react-native-appearance";
import { createTheming, ThemingType } from "@callstack/react-theme-provider";
import { ColorTheme } from "@/types/theme-props";

const colorScheme = Appearance.getColorScheme();
const colorMode = colorScheme === "dark" ? "dark" : "light";

const lightTheme = {
  name: "light",

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
  navText: "#000",
  // 字体尺寸
  fontSizeIconText: 10,
  fontSizeCaptionSm: 12,
  fontSizeBase: 14,
  fontSizeSubhead: 15,
  fontSizeCaption: 16,
  fontSizeHeading: 17,
  // 圆角
  radiusXs: 2,
  radiusSm: 3,
  radiusMd: 5,
  radiusLg: 7,
  // 边框尺寸
  borderWidthSm: 0.5,
  borderWidthMd: 1,
  borderWidthLg: 2,
  // 间距
  // 水平间距
  hSpacingSm: 5,
  hSpacingMd: 8,
  hSpacingLg: 15,
  // 垂直间距
  vSpacingXs: 3,
  vSpacingSm: 6,
  vSpacingMd: 8,
  vSpacingLg: 15,
  vSpacingXl: 21,
  // 高度
  lineHeightBase: 1, // 单行行高
  lineHeightParagraph: 1.5, // 多行行高
  // 图标尺寸
  iconSizeXxs: 15,
  iconSizeXs: 18,
  iconSizeSm: 21,
  iconSizeMd: 22, // 导航条上的图标
  iconSizeLg: 36,
  // button
  buttonHeight: 47,
  buttonFontSize: 18,
  buttonHeightSm: 23,
  buttonFontSizeSm: 12,
  // modal
  modalFontSizeHeading: 18,
  modalButtonFontSize: 18, // 按钮字号
  modalButtonHeight: 50, // 按钮高度
  // list
  listTitleHeight: 30,
  listItemHeightSm: 35,
  listItemHeight: 44,
  // input
  inputFontSize: 16,
  // tabs
  tabsHeight: 42,
  tabsFontSizeHeading: 15
};

const darkTheme = {
  name: "dark",

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
  navText: "#fff",
  // 字体尺寸
  fontSizeIconText: 10,
  fontSizeCaptionSm: 12,
  fontSizeBase: 14,
  fontSizeSubhead: 15,
  fontSizeCaption: 16,
  fontSizeHeading: 17,
  // 圆角
  radiusXs: 2,
  radiusSm: 3,
  radiusMd: 5,
  radiusLg: 7,
  // 边框尺寸
  borderWidthSm: 0.5,
  borderWidthMd: 1,
  borderWidthLg: 2,
  // 间距
  // 水平间距
  hSpacingSm: 5,
  hSpacingMd: 8,
  hSpacingLg: 15,
  // 垂直间距
  vSpacingXs: 3,
  vSpacingSm: 6,
  vSpacingMd: 8,
  vSpacingLg: 15,
  vSpacingXl: 21,
  // 高度
  lineHeightBase: 1, // 单行行高
  lineHeightParagraph: 1.5, // 多行行高
  // 图标尺寸
  iconSizeXxs: 15,
  iconSizeXs: 18,
  iconSizeSm: 21,
  iconSizeMd: 22, // 导航条上的图标
  iconSizeLg: 36,
  // button
  buttonHeight: 47,
  buttonFontSize: 18,
  buttonHeightSm: 23,
  buttonFontSizeSm: 12,
  // modal
  modalFontSizeHeading: 18,
  modalButtonFontSize: 18, // 按钮字号
  modalButtonHeight: 50, // 按钮高度
  // list
  listTitleHeight: 30,
  listItemHeightSm: 35,
  listItemHeight: 44,
  // input
  inputFontSize: 16,
  // tabs
  tabsHeight: 42,
  tabsFontSizeHeading: 15
};

export const themes: { [key: string]: ColorTheme } = {
  light: lightTheme,
  dark: darkTheme
};

const {
  ThemeProvider,
  withTheme,
  useTheme
}: ThemingType<ColorTheme> = createTheming(themes[colorMode]);

export { ThemeProvider, withTheme, useTheme, colorMode };

export const antdLightTheme = {
  color_text_base: lightTheme.text01,
  brand_primary: lightTheme.primary,
  color_link: lightTheme.primary,
  primary_button_fill: lightTheme.primary,
  primary_button_fill_tap: lightTheme.primary
};

export const antdDarkTheme = {
  color_text_base: darkTheme.text01,
  brand_primary: darkTheme.primary,
  color_link: darkTheme.primary,
  primary_button_fill: darkTheme.primary,
  primary_button_fill_tap: darkTheme.primary
};
