import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "../common/navigation-bar";
import { theme } from "../common/theme";
import { i18n } from "../translations";

export class SettingsScreen extends React.Component {
  public render(): JSX.Element {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.white
        }}
      >
        <NavigationBar title={i18n.t("settings")} />
      </View>
    );
  }
}
