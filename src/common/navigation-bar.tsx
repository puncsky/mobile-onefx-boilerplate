import * as Icon from "@expo/vector-icons";
import * as React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp, withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { navigationBarHeight, onePx, statusBarHeight } from "./screen-util";
import { AppState } from "./store";
import { theme } from "./theme";

type Props = {
  currentTheme?: "light" | "dark";
  title: string;
  showBack: boolean;
  navigation: NavigationScreenProp<string>;
};

const NavBar = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class NavBarInner extends React.Component<Props> {
    public render(): JSX.Element {
      const { currentTheme, title, showBack, navigation } = this.props;
      return (
        <View
          style={{
            height: navigationBarHeight,
            backgroundColor: theme.navBg
          }}
        >
          <StatusBar
            barStyle={
              currentTheme === "dark" ? "light-content" : "dark-content"
            }
          />
          <View
            style={{
              marginTop: statusBarHeight,
              justifyContent: "center",
              alignItems: "center",
              height: navigationBarHeight - statusBarHeight,
              borderBottomWidth: onePx,
              borderBottomColor: theme.black80
            }}
          >
            {showBack && (
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  position: "absolute",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  left: 0
                }}
                onPress={() => navigation.pop()}
              >
                <Icon.Ionicons
                  name="ios-arrow-back"
                  size={29}
                  color={theme.navText}
                  style={{ paddingHorizontal: 10 }}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                color: theme.navText,
                fontSize: 17,
                fontWeight: "bold"
              }}
            >
              {title}
            </Text>
          </View>
        </View>
      );
    }
  }
);

//@ts-ignore
export const NavigationBar = withNavigation(NavBar);
