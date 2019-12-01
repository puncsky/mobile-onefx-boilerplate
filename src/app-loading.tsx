//@ts-ignore
import * as Icon from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Action, actionUpdateReduxState } from "./common/root-reducer";

export function AppLoaderRoot({ onFinish }: { onFinish(): void }): JSX.Element {
  return <AppLoadingContainer onFinish={onFinish} />;
}

interface Props {
  actionUpdateReduxState(payload: object): { type: string; payload: object };
  onFinish(): void;
}

const AppLoadingContainer = connect<
  {},
  (
    dispatch: Dispatch<Action>
  ) => { actionUpdateReduxState(payload: Object): void },
  { onFinish(): void }
>(
  undefined,
  dispatch => ({
    actionUpdateReduxState(payload: Object): void {
      dispatch(actionUpdateReduxState(payload));
    }
  })
)(function AppLoadingInner(props: Props): JSX.Element {
  const { actionUpdateReduxState, onFinish } = props;

  const loadResourcesAsync = async () => {
    try {
      actionUpdateReduxState({});
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
    }
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
      })
    ]);
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
    />
  );
});
