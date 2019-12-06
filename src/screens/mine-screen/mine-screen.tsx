import * as React from "react";
import { ScreenProps, TFuncType } from "../../types/screen-props";
import { About } from "./about";

type Props = {
  screenProps: ScreenProps;
};

export class MineScreen extends React.Component<Props> {
  public static navigationOptions = ({
    screenProps: { t }
  }: {
    screenProps: { t: TFuncType };
  }) => ({
    title: t("mine")
  });

  public render(): JSX.Element {
    return <About screenProps={this.props.screenProps} />;
  }
}
