import Button from "@ant-design/react-native/lib/button";
import Modal from "@ant-design/react-native/lib/modal";
import { WebBrowser } from "expo";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";

import { NavigationBar } from "@/common/navigation-bar";
import { MonoText } from "@/common/styled-text";

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white
    },
    developmentModeText: {
      marginBottom: 20,
      color: theme.text01,
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
      color: theme.text01
    },
    codeHighlightContainer: {
      borderRadius: 3,
      paddingHorizontal: 4
    },
    getStartedText: {
      fontSize: 17,
      color: theme.text01,
      lineHeight: 24,
      textAlign: "center"
    },
    tabBarInfoText: {
      fontSize: 17,
      color: theme.text01,
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
      color: theme.secondary
    }
  });

function HomeScreen(): JSX.Element {
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);

  const onCloseModal = () => {
    setShouldDisplayModal(false);
  };

  const handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    ).catch((err: Error) => {
      // tslint:disable-next-line:no-console
      console.error(`failed to handleLearnMorePress: ${err}`);
    });
  };

  const handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    ).catch((err: Error) => {
      // tslint:disable-next-line:no-console
      console.error(`failed to handleHelpPress: ${err}`);
    });
  };

  const maybeRenderDevelopmentModeWarning = () => {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={handleLearnMorePress} style={styles().helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles().developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    }
    return (
      <Text style={styles().developmentModeText}>
        You are not in development mode, your app will run at full speed.
      </Text>
    );
  };

  const imgSource = __DEV__
    ? require("@/assets/images/robot-dev.png")
    : require("@/assets/images/robot-prod.png");
  return (
    <View style={styles().container}>
      <NavigationBar title={i18n.t("home")} />
      <ScrollView style={styles().container}>
        <View style={styles().welcomeContainer}>
          <Image source={imgSource} style={styles().welcomeImage} />
        </View>

        <View style={styles().getStartedContainer}>
          {maybeRenderDevelopmentModeWarning()}

          <Text style={styles().getStartedText}>Get started by opening</Text>

          <View
            style={[
              styles().codeHighlightContainer,
              styles().homeScreenFilename
            ]}
          >
            <MonoText style={styles().codeHighlightText}>
              screens/HomeScreen.js
            </MonoText>
          </View>

          <Text style={styles().getStartedText}>
            Change this text and your app will automatically reload.
          </Text>
        </View>

        <View style={styles().helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles().helpLink}>
            <Text style={styles().helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent={false}
          visible={shouldDisplayModal}
          animationType="slide-up"
          onClose={onCloseModal}
        >
          <View style={{ paddingVertical: 220 }}>
            <Text style={{ textAlign: "center" }}>Hello! Welcome!</Text>
          </View>
          <Button
            onPress={() => {
              setShouldDisplayModal(false);
            }}
          >
            Cancel
          </Button>
        </Modal>
        <Button
          type="primary"
          onPress={() => {
            setShouldDisplayModal(true);
          }}
        >
          hey
        </Button>
      </ScrollView>
    </View>
  );
}

export { HomeScreen };
