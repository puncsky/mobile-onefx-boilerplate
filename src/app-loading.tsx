//@ts-ignore
import * as Icon from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Action, actionUpdateReduxState } from "./common/root-reducer";
import { AppState } from "./common/store";
import { theme } from "./common/theme";
import i18n from "./translations";
import { ThemeProps } from "./types/theme-props";

export function AppLoaderRoot({ onFinish }: { onFinish(): void }): JSX.Element {
  //@ts-ignore
  return <AppLoadingContainer onFinish={onFinish} />;
}

interface Props {
  actionUpdateReduxState(payload: object): { type: string; payload: object };
  onFinish(): void;
  mixpanelId?: string;
  userId?: string;
  locale?: string;
  currentTheme?: ThemeProps;
}

const AppLoadingContainer = connect<
  {},
  (
    dispatch: Dispatch<Action>
  ) => { actionUpdateReduxState(payload: Object): void },
  { onFinish(): void }
>(
  (state: AppState) => ({
    userId: state.base.userId,
    mixpanelId: state.base.mixpanelId,
    locale: state.base.locale,
    currentTheme: state.base.currentTheme
  }),
  dispatch => ({
    actionUpdateReduxState(payload: Object): void {
      dispatch(actionUpdateReduxState(payload));
    }
  })
)(function AppLoadingInner(props: Props): JSX.Element {
  const { locale, onFinish, currentTheme, actionUpdateReduxState } = props;

  if (locale) {
    i18n.locale = locale;
  }

  if (!currentTheme) {
    actionUpdateReduxState({
      base: {
        currentTheme: theme.light
      }
    });
  }

  const loadResourcesAsync = async () => {
    try {
      await Promise.all([
        Asset.loadAsync([
          require("./assets/images/robot-dev.png"),
          require("./assets/images/robot-prod.png")
        ]),
        Font.loadAsync({
          // This is the font that we are using for our tab bar
          ...Icon.Ionicons.font,
          // We include SpaceMono because we use it in HomeScreen.js. Feel free
          // to remove this if you are not using it in your app
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        }),
        Font.loadAsync(
          "antoutline",
          require("../node_modules/@ant-design/icons-react-native/fonts/antoutline.ttf")
        )
      ]);
    } catch (error) {
      // tslint:disable-next-line
      console.error(`failed to loadResourcesAsync: ${error}`);
    }
  };

  const handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  return (
    <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={onFinish}
      autoHideSplash={false}
    />
  );
});
