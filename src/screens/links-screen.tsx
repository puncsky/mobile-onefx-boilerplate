import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";

export function LinksScreen(): JSX.Element {
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
}
