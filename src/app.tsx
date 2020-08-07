import { Notifications, SplashScreen } from "expo";
import { EventSubscription } from "fbemitter";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoaderRoot } from "./app-loading";
import { AppNavigatorContainer } from "./common/navigation/app-navigator-container";
import { Providers } from "./common/providers";
import "./common/sentry";
import { theme } from "./common/theme";
import { withTheme } from "./common/with-theme";

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
        <AppContent />
      </Providers>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white
  }
});

const AppContent = withTheme(() => (
  <View style={styles.container}>
    {Platform.OS === "ios" && (
      <StatusBar
        barStyle={theme.name === "dark" ? "light-content" : "dark-content"}
      />
    )}
    <AppNavigatorContainer />
  </View>
));
