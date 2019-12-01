import AntdProvider from "@ant-design/react-native/lib/provider";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { AppLoaderRoot } from "./app-loading";
import { antdTheme } from "./components/colors";
import { AppNavigator } from "./navigation/app-navigator";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "react-apollo";
import { persistor, store } from "./common/store";
import { apolloClient } from "./common/apollo-client";

interface Props {
  skipLoadingScreen?: boolean;
}

interface State {
  isLoadingComplete?: boolean;
}

function Providers({
  children
}: {
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element {
  return (
    /* tslint:disable:no-any */
    <Provider store={store as any}>
      <AntdProvider theme={antdTheme}>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </PersistGate>
      </AntdProvider>
    </Provider>
  );
}

export class App extends React.Component<Props, State> {
  public state: State = {
    isLoadingComplete: false
  };

  public render(): JSX.Element {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Providers>
          <AppLoaderRoot
            onFinish={() => {
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
          <AppNavigator />
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
