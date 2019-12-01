import AntdProvider from "@ant-design/react-native/lib/provider";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { AppLoaderRoot } from "./app-loading";
import { antdTheme } from "./components/colors";
import { store } from "./components/store";
import AppNavigator from "./navigation/app-navigator";

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

  public render(): JSX.Element {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AntdProvider theme={antdTheme}>
          <AppLoaderRoot
            onFinish={() => {
              this.setState({ isLoadingComplete: true });
            }}
          />
        </AntdProvider>
      );
    } else {
      return (
        <Provider store={store}>
          <AntdProvider theme={antdTheme}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </AntdProvider>
        </Provider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
