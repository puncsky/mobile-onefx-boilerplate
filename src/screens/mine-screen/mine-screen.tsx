import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "../../common/navigation-bar";
import { ScreenHeight } from "../../common/screen-util";
import { theme } from "../../common/theme";
import { i18n } from "../../translations";
import { ScreenProps } from "../../types/screen-props";
import { About } from "./about";

type Props = {
  screenProps: ScreenProps;
};

export class MineScreen extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <View
        style={{
          backgroundColor: theme.white,
          height: ScreenHeight
        }}
      >
        <NavigationBar title={i18n.t("mine")} />
        <About screenProps={this.props.screenProps} />
      </View>
    );
  }
}
