import { Notifications } from "expo";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppNavigatorContainer } from "@/common/navigation/app-navigator-container";
import "@/common/sentry";
import { withTheme } from "@/common/with-theme";
import { useCachedResources } from "@/common/hooks/use-cached-resource";
import { setTheme, theme } from "@/common/theme";
import { i18n } from "@/translations";
import { Providers } from "./common/providers";
import { Scope, TranslateOptions } from "i18n-js";
const defaultValue: any = {};
export const LocalizationContext = React.createContext(defaultValue);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white
  }
});

export function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    // tslint:disable-next-line
    function handleNotification(notification: any) {
      // tslint:disable-next-line
      console.log(notification, "notification");
    }
    const notificationSubscription = Notifications.addListener(
      handleNotification
    );
    return function cleanup() {
      notificationSubscription.remove();
    };
  }, []);

  const [locale, setLocale] = React.useState(i18n.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope: Scope, options: TranslateOptions) =>
        i18n.t(scope, { locale, ...options }),
      locale,
      setLocale
    }),
    [locale]
  );

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <LocalizationContext.Provider value={localizationContext}>
      <Providers>
        <AppContent />
      </Providers>
    </LocalizationContext.Provider>
  );
}

const AppContent = withTheme(
  connect((state: { base: { locale: string; currentTheme: string } }) => ({
    locale: state.base.locale,
    currentTheme: state.base.currentTheme
  }))((props: { locale: string; currentTheme: "dark" | "light" }) => {
    const { locale, currentTheme } = props;

    if (locale && i18n) {
      i18n.locale = locale;
    }

    if (currentTheme !== theme.name) {
      setTheme(currentTheme);
    }

    return (
      <View style={styles.container}>
        <StatusBar style={theme.name === "dark" ? "light" : "dark"} />
        <AppNavigatorContainer />
      </View>
    );
  })
);
