import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { ScreenHeight } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { ScreenProps } from "@/types/screen-props";
import { About } from "@/screens/mine-screen/about";
import { connect } from "react-redux";
import { AppState } from "@/common/store";

type Props = {
  navigation: any;
  screenProps: ScreenProps;
};
export const MineScreen = connect((state: AppState) => {
  return {
    locale: state.base.locale
  };
})(function MineScreenInnner(props: Props): JSX.Element {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colorTheme.white,
        height: ScreenHeight
      }}
    >
      <NavigationBar title={i18n.t("mine")} />
      <About navigation={props.navigation} />
    </View>
  );
});
