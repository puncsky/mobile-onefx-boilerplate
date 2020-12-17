/* tslint:disable:no-any */
import { List } from "@ant-design/react-native";
import Constants from "expo-constants";
import * as StoreReview from "expo-store-review";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { Alert, Platform, ScrollView, Switch, View } from "react-native";
import { connect } from "react-redux";
import { analytics } from "@/common/analytics";
import { ListHeader } from "@/common/list-header";
import { registerForPushNotificationAsync } from "@/common/register-push-token";
import { actionUpdateReduxState } from "@/common/root-reducer";
import { AppState } from "@/common/store";
import { useTheme } from "@/common/theme";
import { i18n, LocalizationContext } from "@/translations";
import { InviteSection } from "@/screens/referral-screen/components/invite-section";
import { AccountHeader } from "@/screens/mine-screen/account-header";

import { actionLogout } from "./account-reducer";

const { Item } = List;
const { Brief } = Item;

type Props = {
  authToken: string;
  locale: string;
  logout: (authToken: string) => void;
  updateReduxState: (state: {
    base: { locale?: string; currentTheme?: string };
  }) => void;
  currentTheme: "dark" | "light";
  navigation: any;
};

export const About = connect(
  (state: AppState) => ({
    authToken: state.base.authToken,
    locale: state.base.locale,
    currentTheme: state.base.currentTheme
  }),
  dispatch => ({
    logout(authToken: string): void {
      dispatch(actionLogout(authToken));
    },
    updateReduxState(payload: { base: { locale: string } }): void {
      dispatch(actionUpdateReduxState(payload));
    }
  })
)(
  ({
    authToken,
    locale,
    logout,
    updateReduxState,
    navigation,
    currentTheme
  }: Props) => {
    useEffect(() => {
      async function init() {
        await registerForPushNotificationAsync();
        await analytics.track("page_view_mine", {});
      }
      init();
    }, []);
    const { setLocale } = React.useContext(LocalizationContext);
    const theme = useTheme();

    const renderAppSection = () => {
      const backgroundColor = {
        backgroundColor: theme.colorTheme.white,
        color: theme.colorTheme.text01
      };
      return (
        <List
          style={backgroundColor}
          renderHeader={<ListHeader>{i18n.t("about")}</ListHeader>}
        >
          <Item
            disabled
            extra={Platform.OS === "ios" ? "Apple Store" : "Google Play"}
            arrow="horizontal"
            style={backgroundColor}
            onPress={async () => {
              const storeUrl = StoreReview.storeUrl();
              if (storeUrl) {
                await WebBrowser.openBrowserAsync(storeUrl);
              }
            }}
          >
            {i18n.t("reviewApp")}
          </Item>
          <Item
            disabled
            style={backgroundColor}
            extra={
              <Switch
                value={String(locale).startsWith("en")}
                onValueChange={value => {
                  const changeTo = value ? "en" : "zh";
                  updateReduxState({
                    base: { locale: changeTo }
                  });
                  i18n.locale = changeTo;
                  setLocale(changeTo);
                }}
              />
            }
          >
            {i18n.t("currentLanguage")}
            <Brief>
              {String(locale).startsWith("en")
                ? i18n.t("english")
                : i18n.t("chinese")}
            </Brief>
          </Item>

          <Item
            style={backgroundColor}
            disabled
            extra={
              <Switch
                value={currentTheme === "dark"}
                onValueChange={value => {
                  const mode = value ? "dark" : "light";
                  updateReduxState({
                    base: { currentTheme: mode }
                  });
                }}
              />
            }
          >
            {i18n.t("theme")}
            <Brief>{currentTheme === "dark" ? "Dark" : "Light"}</Brief>
          </Item>

          <Item
            style={backgroundColor}
            disabled
            extra={Constants.nativeAppVersion}
          >
            {i18n.t("currentVersion")}
          </Item>
          {authToken ? (
            <Item
              style={backgroundColor}
              disabled
              onPress={() => {
                Alert.alert(
                  "",
                  i18n.t("logoutAlertMsg"),
                  [
                    { text: i18n.t("logoutAlertCancel"), style: "cancel" },
                    {
                      text: i18n.t("logoutAlertConfirm"),
                      onPress: () => {
                        logout(authToken);
                      }
                    }
                  ],
                  { cancelable: false }
                );
              }}
            >
              {i18n.t("logout")}
            </Item>
          ) : (
            <View />
          )}
        </List>
      );
    };

    return (
      <ScrollView style={{ backgroundColor: theme.colorTheme.white }}>
        <AccountHeader />
        <InviteSection navigation={navigation} />
        {renderAppSection()}
      </ScrollView>
    );
  }
);
