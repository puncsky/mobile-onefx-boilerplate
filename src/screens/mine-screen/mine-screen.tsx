import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { ScreenHeight } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { ScreenProps } from "@/types/screen-props";
import { About } from "@/screens/mine-screen/about";
import { NavigationScreenProp } from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<string>;
  screenProps: ScreenProps;
};

export function MineScreen(props: Props): JSX.Element {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colorTheme.white,
        height: ScreenHeight
      }}
    >
      <NavigationBar title={i18n.t("mine")} />
      <About screenProps={props.screenProps} navigation={props.navigation} />
    </View>
  );
}
