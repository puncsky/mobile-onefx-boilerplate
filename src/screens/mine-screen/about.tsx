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
// import { setTheme, theme } from "@/common/theme";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { ScreenProps } from "@/types/screen-props";
import { InviteSection } from "@/screens/referral-screen/components/invite-section";
import { AccountHeader } from "@/screens/mine-screen/account-header";
import { NavigationScreenProp } from "react-navigation";
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
  screenProps: ScreenProps;
  currentTheme: "dark" | "light";
  navigation: NavigationScreenProp<string>;
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
    screenProps,
    currentTheme,
    navigation
  }: Props) => {
    useEffect(() => {
      async function init() {
        await registerForPushNotificationAsync();
        await analytics.track("page_view_mine", {});
      }
      init();
    }, []);

    const theme = useTheme();

    const renderAppSection = () => {
      const backgroundColor = {
        backgroundColor: theme.white,
        color: theme.text01
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
                  screenProps.setLocale(changeTo);
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
                  // setTheme(mode);
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
      <ScrollView style={{ backgroundColor: theme.white }}>
        <AccountHeader />
        <InviteSection navigation={navigation} />
        {renderAppSection()}
      </ScrollView>
    );
  }
);
