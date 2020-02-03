import { Dimensions, PixelRatio, Platform } from "react-native";
import { StatusBar } from "react-native";
export const ScreenWidth = Dimensions.get("window").width;
export const ScreenHeight = Dimensions.get("window").height;
const androidStatusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight
  : 0;
const isIphoneX =
  Platform.OS === "ios" &&
  Number(`${ScreenHeight / ScreenWidth}`.substr(0, 4)) * 100 === 216;
const statusBarHeight =
  Platform.OS === "ios" ? (isIphoneX ? 44 : 20) : androidStatusBarHeight;
const navigationBarHeight =
  Platform.OS === "ios" ? (isIphoneX ? 88 : 64) : androidStatusBarHeight + 59;
const onePx = 1 / PixelRatio.get();
export { statusBarHeight, navigationBarHeight, onePx };
