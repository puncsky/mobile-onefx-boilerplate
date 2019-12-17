//@ts-ignore
import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import { Dimensions, View, WebView } from "react-native";
import { connect } from "react-redux";
import { analytics } from "../../common/analytics";
import { getEndpoint, headers } from "../../common/request";
import { actionUpdateReduxState } from "../../common/root-reducer";

const { height } = Dimensions.get("window");

type State = {};

type Props = {
  isSignUp: boolean;
  onClose: Function;
  actionUpdateReduxState: Function;
};

export const LoginWebView = connect(
  () => ({}),
  dispatch => ({
    actionUpdateReduxState(payload: Object): void {
      dispatch(actionUpdateReduxState(payload));
    }
  })
)(
  class LoginWebViewInner extends Component<Props, State> {
    public state: State = { actionHash: "" };

    public webViewRef: WebView | null;

    public render(): JSX.Element {
      const { actionUpdateReduxState, isSignUp } = this.props;

      return (
        <View style={{ flex: 1, flexDirection: "column" }}>
          <WebView
            originWhitelist={["*"]}
            source={{
              // tslint:disable-next-line:no-http-string
              uri: isSignUp ? getEndpoint("sign-up") : getEndpoint("login"),
              headers
            }}
            style={{
              alignSelf: "stretch",
              marginTop: 0,
              height: height - 24
            }}
            useWebKit={true}
            onMessage={async event => {
              try {
                const msg = decodeURIComponent(
                  decodeURIComponent(event.nativeEvent.data)
                );
                const msgObj = JSON.parse(msg);
                if (msgObj.authToken) {
                  const { sub } = jwtDecode(msgObj.authToken);
                  analytics.identify(sub);
                  await analytics.track(
                    isSignUp ? "signed_up" : "logged_in",
                    {}
                  );
                  actionUpdateReduxState({
                    base: { userId: sub, authToken: msgObj.authToken }
                  });
                  this.props.onClose();
                }
              } catch (e) {
                // tslint:disable-next-line:no-console
                console.error(`failed to decode jwt: ${e}`);
              }
            }}
            ref={webView => {
              this.webViewRef = webView;
            }}
          />
        </View>
      );
    }
  }
);
