import * as Icon from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Asset.loadAsync([
          require("@/assets/images/robot-dev.png"),
          require("@/assets/images/robot-prod.png")
        ]);

        await Font.loadAsync({
          ...Icon.Ionicons.font,
          "space-mono": require("@/assets/fonts/SpaceMono-Regular.ttf"),
          antoutline: require("../../../node_modules/@ant-design/icons-react-native/fonts/antoutline.ttf")
        });
      } catch (e) {
        // tslint:disable-next-line
        console.error(`failed to loadResourcesAsync: ${e}`);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
