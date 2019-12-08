import { Dimensions, PixelRatio, Platform } from "react-native";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
const isIphoneX =
  Platform.OS === "ios" &&
  Number(`${ScreenHeight / ScreenWidth}`.substr(0, 4)) * 100 === 216;
const statusBarHeight = Platform.OS === "ios" ? (isIphoneX ? 44 : 20) : 0;
const navigationBarHeight = Platform.OS === "ios" ? (isIphoneX ? 88 : 64) : 59;
const onePx = 1 / PixelRatio.get();
export { statusBarHeight, navigationBarHeight, onePx };
