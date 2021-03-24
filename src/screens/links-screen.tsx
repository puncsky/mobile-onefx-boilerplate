import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { connect } from "react-redux";
import { AppState } from "@/common/store";

export const LinksScreen = connect((state: AppState) => {
  return {
    locale: state.base.locale
  };
})(function LinksScreenInner(): JSX.Element {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colorTheme.white
      }}
    >
      <NavigationBar title={i18n.t("links")} />
    </View>
  );
});
