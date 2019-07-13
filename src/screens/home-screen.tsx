import { Button, Modal } from "antd-mobile-rn";
import { WebBrowser } from "expo";
import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { NoteListContainer } from "../components/note-list";
import { MonoText } from "../components/styled-text";
import { TopBar } from "../components/top-bar";

type State = {
  shouldDisplayModal: boolean;
};

export default class HomeScreen extends React.Component<{}, State> {
  public static navigationOptions: { header: null } = {
    // tslint:disable-next-line
    header: null
  };

  public state: State = {
    shouldDisplayModal: false
  };

  private readonly onCloseModal = () => {
    this.setState({ shouldDisplayModal: false });
  };

  public render(): JSX.Element {
    const imgSource = __DEV__
      ? require("../assets/images/robot-dev.png")
      : require("../assets/images/robot-prod.png");
    return (
      <View style={styles.container}>
        <TopBar />
        <ScrollView style={styles.container}>
          <NoteListContainer />
          <View style={styles.welcomeContainer}>
            <Image source={imgSource} style={styles.welcomeImage} />
          </View>

          <View style={styles.getStartedContainer}>
            {this.maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                screens/HomeScreen.js
              </MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this.handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            transparent={false}
            visible={this.state.shouldDisplayModal}
            animationType="slide-up"
            onClose={this.onCloseModal}
          >
            <View style={{ paddingVertical: 220 }}>
              <Text style={{ textAlign: "center" }}>Content...</Text>
              <Text style={{ textAlign: "center" }}>Content...</Text>
            </View>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ shouldDisplayModal: false });
              }}
            >
              close modal
            </Button>
          </Modal>
          <Button
            onClick={() => {
              this.setState({ shouldDisplayModal: true });
            }}
          >
            hey
          </Button>
        </ScrollView>
      </View>
    );
  }

  private maybeRenderDevelopmentModeWarning(): JSX.Element {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this.handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  private readonly handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    ).catch(err => {
      // tslint:disable-next-line:no-console
      console.error(`failed to handleLearnMorePress: ${err}`);
    });
  };

  private readonly handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    ).catch(err => {
      // tslint:disable-next-line:no-console
      console.error(`failed to handleHelpPress: ${err}`);
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
