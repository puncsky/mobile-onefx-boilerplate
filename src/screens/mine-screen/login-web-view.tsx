import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import { analytics } from "../../common/analytics";
import { getEndpoint, headers } from "../../common/request";
import { actionUpdateReduxState } from "../../common/root-reducer";

const { height } = Dimensions.get("window");

type Props = {
  isSignUp: boolean;
  onClose: () => void;
  updateReduxState: (payload: {
    base: { userId: string; authToken: string };
  }) => void;
};

export const LoginWebView = connect(
  () => ({}),
  dispatch => ({
    updateReduxState(payload: {
      base: { userId: string; authToken: string };
    }): void {
      dispatch(actionUpdateReduxState(payload));
    }
  })
)(
  class LoginWebViewInner extends Component<Props> {
    public webViewRef: WebView | null;

    public render(): JSX.Element {
      const { updateReduxState, isSignUp } = this.props;
      const injectedJavascript = `(function() {
            window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data);
        };
      })()`;
      return (
        <View style={{ flex: 1, flexDirection: "column" }}>
          <WebView
            injectedJavaScript={injectedJavascript}
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
                  updateReduxState({
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
