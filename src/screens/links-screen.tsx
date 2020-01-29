import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "../components/navigation-bar";
import { i18n } from "../translations";
export class LinksScreen extends React.Component {
  public render(): JSX.Element {
    return (
      <View>
        <NavigationBar title={i18n.t("links")} />
      </View>
    );
  }
}
