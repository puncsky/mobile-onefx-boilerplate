import { Scope, TranslateOptions } from "i18n-js";
import React, { useState } from "react";
import { connect } from "react-redux";
import { i18n } from "@/translations";
import { AppState } from "@/common/store";
import { AppNavigator } from "@/common/navigation/app-navigator";

export const LocalizationContext = React.createContext({});

type Props = {
  locale: string;
  currentTheme?: "dark" | "light";
};

export const AppNavigatorContainer = connect((state: AppState) => {
  return { locale: state.base.locale, currentTheme: state.base.currentTheme };
})(function AppNavigatorContainerInner(props: Props): JSX.Element {
  const [locale, setLocale] = useState(props.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope: Scope, options: TranslateOptions) =>
        i18n.t(scope, { locale, ...options }),
      locale,
      setLocale
    }),
    [locale]
  );
  // const t = (scope: Scope, options: TranslateOptions) => {
  //   return i18n.t(scope, { locale, ...options });
  // };
  const { currentTheme } = props;
  return (
    <LocalizationContext.Provider value={localizationContext}>
      <AppNavigator
        screenProps={{
          locale: props.locale,
          currentTheme,
          setLocale
        }}
      />
    </LocalizationContext.Provider>
  );
});
