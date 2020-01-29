import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "../../components/navigation-bar";
import { i18n } from "../../translations";
import { ScreenProps } from "../../types/screen-props";
import { About } from "./about";

type Props = {
  screenProps: ScreenProps;
};

export class MineScreen extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <View>
        <NavigationBar title={i18n.t("mine")} />
        <About screenProps={this.props.screenProps} />
      </View>
    );
  }
}
