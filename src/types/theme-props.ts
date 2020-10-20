/* eslint-disable camelcase */
export interface ThemeProps {
  name: string;
  antdTheme: AntdTheme;
  theme: ColorTheme;
}

export interface AntdTheme {
  brand_primary: string;
  color_link: string;
  primary_button_fill: string;
  primary_button_fill_tap: string;
}

export interface ColorTheme {
  name: string;
  black: string;
  black10: string;
  black20: string;
  black40: string;
  black60: string;
  black80: string;
  black90: string;
  error: string;
  information: string;
  nav01: string;
  nav02: string;
  primary: string;
  secondary: string;
  success: string;
  tabIconDefault: string;
  tabIconSelected: string;
  text01: string;
  warning: string;
  white: string;
  activeTintColor: string;
  inactiveTintColor: string;
  activeBackgroundColor: string;
  inactiveBackgroundColor: string;
  navBg: string;
  navText: string;
  fontSizeIconText: number;
  fontSizeCaptionSm: number;
  fontSizeBase: number;
  fontSizeSubhead: number;
  fontSizeCaption: number;
  fontSizeHeading: number;
  radiusXs: number;
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  borderWidthSm: number;
  borderWidthMd: number;
  borderWidthLg: number;
  hSpacingSm: number;
  hSpacingMd: number;
  hSpacingLg: number;
  vSpacingXs: number;
  vSpacingSm: number;
  vSpacingMd: number;
  vSpacingLg: number;
  vSpacingXl: number;
  lineHeightBase: number;
  lineHeightParagraph: number;
  iconSizeXxs: number;
  iconSizeXs: number;
  iconSizeSm: number;
  iconSizeMd: number;
  iconSizeLg: number;
  buttonHeight: number;
  buttonFontSize: number;
  buttonHeightSm: number;
  buttonFontSizeSm: number;
  modalFontSizeHeading: number;
  modalButtonFontSize: number;
  modalButtonHeight: number;
  listTitleHeight: number;
  listItemHeightSm: number;
  listItemHeight: number;
  inputFontSize: number;
  tabsHeight: number;
  tabsFontSizeHeading: number;
}
