import { Scope, TranslateOptions } from "i18n-js";
import React, { useState } from "react";
import { connect } from "react-redux";
import { i18n } from "@/translations";
import { AppState } from "@/common/store";
import { AppNavigator } from "@/common/navigation/app-navigator";
import { LocalizationContext } from "@/translations";

type Props = {
  locale: string;
};

export const AppNavigatorContainer = connect((state: AppState) => {
  return { locale: state.base.locale };
})(function AppNavigatorContainerInner(props: Props): JSX.Element {
  const { locale, setLocale } = React.useContext(LocalizationContext);
  i18n.locale = locale;
  setLocale(props.locale);
  return <AppNavigator />;
});
