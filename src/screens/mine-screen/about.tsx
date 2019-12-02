/* tslint:disable:no-any */
import { List } from "@ant-design/react-native";
import { StoreReview } from "expo";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Alert, Platform, ScrollView, Switch } from "react-native";
import { connect } from "react-redux";
import { analytics } from "../../common/analytics";
import { registerForPushNotificationAsync } from "../../common/register-push-token";
import { actionUpdateReduxState } from "../../common/root-reducer";
import { AppState } from "../../common/store";
import i18n from "../../locale";
import { ScreenProps } from "../../types/screen-props";
import { AccountHeader } from "./account-header";
import { actionLogout } from "./account-reducer";

const Item = List.Item;
const Brief = Item.Brief;

type AboutProps = {
  // navigation: any;
  authToken: string;
  locale: string;
  actionLogout: Function;
  actionUpdateReduxState: Function;
  screenProps: ScreenProps;
};

export const About = connect(
  (state: AppState) => ({
    authToken: state.base.authToken,
    locale: state.base.locale
  }),
  dispatch => ({
    actionLogout(authToken: string): void {
      dispatch(actionLogout(authToken));
    },
    actionUpdateReduxState(payload: Object): void {
      dispatch(actionUpdateReduxState(payload));
    }
  })
)(
  class AboutInner extends React.Component<AboutProps> {
    async componentDidMount(): Promise<void> {
      await registerForPushNotificationAsync();
      await analytics.track("page_view_mine", {});
    }
    renderAppSection = () => {
      const {
        actionLogout,
        authToken,
        actionUpdateReduxState,
        locale
      } = this.props;
      return (
        <List renderHeader={i18n.t("about")}>
          <Item
            disabled
            extra={Platform.OS === "ios" ? "Apple Store" : "Google Play"}
            arrow="horizontal"
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
            extra={
              <Switch
                value={String(locale).startsWith("en")}
                onValueChange={value => {
                  const changeTo = value ? "en" : "zh";
                  actionUpdateReduxState({
                    base: { locale: changeTo }
                  });
                  i18n.locale = changeTo;
                  this.props.screenProps.setLocale(changeTo);
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
          <Item disabled extra={Constants.nativeAppVersion}>
            {i18n.t("currentVersion")}
          </Item>
          {authToken ? (
            <Item
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
                        actionLogout(authToken);
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
            <Item style={{ height: 0 }} />
          )}
        </List>
      );
    };

    render(): JSX.Element {
      return (
        <ScrollView>
          <AccountHeader />
          {this.renderAppSection()}
        </ScrollView>
      );
    }
  }
);
