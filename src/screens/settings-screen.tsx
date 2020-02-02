import * as React from "react";
import { View } from "react-native";
import { ktheme } from "../common/theme";
import { NavigationBar } from "../components/navigation-bar";
import { i18n } from "../translations";

export class SettingsScreen extends React.Component {
  public render(): JSX.Element {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: ktheme.white
        }}
      >
        <NavigationBar title={i18n.t("settings")} />
      </View>
    );
  }
}
