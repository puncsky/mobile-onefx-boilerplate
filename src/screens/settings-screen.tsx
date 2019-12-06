// @ts-ignore
import { ExpoConfigView } from "@expo/samples";
import * as React from "react";
import { TFuncType } from "../types/screen-props";
export class SettingsScreen extends React.Component {
  public static navigationOptions = ({
    screenProps: { t }
  }: {
    screenProps: { t: TFuncType };
  }) => ({
    title: t("settings")
  });

  public render(): JSX.Element {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
