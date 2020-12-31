import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "@/common/navigation/app-navigator";
import "@/common/sentry";
import { actionUpdateReduxState } from "@/common/root-reducer";
import { useCachedResources } from "@/common/hooks/use-cached-resource";
import { useTheme } from "@/common/theme";
import { i18n, LocalizationContext } from "@/translations";
import { Scope, TranslateOptions } from "i18n-js";
import { Providers } from "./common/providers";

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    const notificationSubscription = Notifications.addNotificationReceivedListener(
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
    return <View />;
  }

  return (
    <LocalizationContext.Provider value={localizationContext}>
      <Providers>
        <AppContent />
      </Providers>
    </LocalizationContext.Provider>
  );
}

const AppContent = connect(
  (state: { base: { locale: string; currentTheme: string } }) => ({
    locale: state.base.locale,
    currentTheme: state.base.currentTheme
  }),
  dispatch => ({
    updateReduxState(payload: { base: { currentTheme: string } }): void {
      dispatch(actionUpdateReduxState(payload));
    }
  })
)(
  (props: {
    locale: string;
    currentTheme: "dark" | "light";
    updateReduxState: (state: { base: { currentTheme: string } }) => void;
  }) => {
    const { locale, currentTheme, updateReduxState } = props;
    const { setLocale } = React.useContext(LocalizationContext);
    const theme = useTheme();
    if (locale && i18n) {
      i18n.locale = locale;
    }

    if (currentTheme !== theme.name) {
      updateReduxState({
        base: { currentTheme }
      });
    }

    React.useEffect(() => {
      setLocale(locale);
    }, []);

    return (
      <View style={styles.container}>
        <StatusBar style={theme.name === "dark" ? "light" : "dark"} />
        <AppNavigator />
      </View>
    );
  }
);
