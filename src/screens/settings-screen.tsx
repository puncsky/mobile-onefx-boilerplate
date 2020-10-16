import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";

export function SettingsScreen(): JSX.Element {
  const theme = useTheme();
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
