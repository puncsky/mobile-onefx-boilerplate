import AntdProvider from "@ant-design/react-native/lib/provider";
import { Notifications, SplashScreen } from "expo";
import Constants from "expo-constants";
import { EventSubscription } from "fbemitter";
import { Scope, TranslateOptions } from "i18n-js";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "sentry-expo";
import { AppLoaderRoot } from "./app-loading";
import { apolloClient } from "./common/apollo-client";
import { antdTheme } from "./common/colors";
import { persistor, store } from "./common/store";
import { AppState } from "./common/store";
import i18n from "./locale";
import { AppNavigator } from "./navigation/app-navigator";

Sentry.init({
  dsn: "",
  enableInExpoDevelopment: true,
  debug: true
});
Sentry.setRelease(Constants.manifest.revisionId);

function Providers({
  children
}: {
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element {
  return (
    /* tslint:disable:no-any */
    <Provider store={store as any}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

type InnerProps = {
  locale: string;
};
type InnerState = {
  locale: string;
};
const AppNavigatorContainer = connect((state: AppState) => {
  return { locale: state.base.locale };
})(
  class AppNavigatorContainerInner extends React.Component<
    InnerProps,
    InnerState
  > {
    state: InnerState = {
      locale: this.props.locale
    };

    setLocale = (locale: string) => {
      this.setState({ locale });
    };

    t = (scope: Scope, options: TranslateOptions) => {
      return i18n.t(scope, { locale: this.state.locale, ...options });
    };

    render(): JSX.Element {
      return (
        <AntdProvider theme={antdTheme}>
          <AppNavigator
            screenProps={{
              t: this.t,
              locale: this.props.locale,
              setLocale: this.setLocale
            }}
          />
        </AntdProvider>
      );
    }
  }
);

interface Props {
  skipLoadingScreen?: boolean;
}

interface State {
  isLoadingComplete?: boolean;
}

export class App extends React.Component<Props, State> {
  public state: State = {
    isLoadingComplete: false
  };

  notificationSubscription: EventSubscription;

  public componentDidMount(): void {
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  // tslint:disable-next-line
  handleNotification = (notification: any) => {
    // tslint:disable-next-line
    console.log(notification, "notification");
  };

  public componentWillUnmount(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.remove();
    }
  }

  public render(): JSX.Element {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Providers>
          <AppLoaderRoot
            onFinish={() => {
              SplashScreen.hide();
              this.setState({ isLoadingComplete: true });
            }}
          />
        </Providers>
      );
    }

    return (
      <Providers>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigatorContainer />
        </View>
      </Providers>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
