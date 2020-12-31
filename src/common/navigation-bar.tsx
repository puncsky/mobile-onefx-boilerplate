import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import {
  navigationBarHeight,
  onePx,
  statusBarHeight
} from "@/common/screen-util";
import { AppState } from "@/common/store";
import { useTheme } from "@/common/theme";

type Props = {
  currentTheme?: "light" | "dark";
  title: string;
  showBack?: boolean;
  navigation?: any;
};

export const NavigationBar = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(function NavigationBarInner(props: Props): JSX.Element {
  const { title, showBack, navigation } = props;
  const theme = useTheme();
  return (
    <View
      style={{
        height: navigationBarHeight,
        backgroundColor: theme.colorTheme.navBg
      }}
    >
      <View
        style={{
          marginTop: statusBarHeight,
          justifyContent: "center",
          alignItems: "center",
          height: navigationBarHeight - statusBarHeight,
          borderBottomWidth: onePx,
          borderBottomColor: theme.colorTheme.black80
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
            onPress={() => navigation && navigation.pop()}
          >
            <Ionicons
              name="ios-arrow-back"
              size={29}
              color={theme.colorTheme.navText}
              style={{ paddingHorizontal: 10 }}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: theme.colorTheme.navText,
            fontSize: 17,
            fontWeight: "bold"
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
});
