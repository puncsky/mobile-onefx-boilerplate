import Constants from "expo-constants";
import * as React from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { colors } from "./colors";

export function TopBar(): JSX.Element {
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          backgroundColor: colors.primary,
          height: Constants.statusBarHeight
        }}
      />
      <View
        style={{
          backgroundColor: colors.primary,
          height: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 32, height: 32 }}
            source={require("../assets/images/icon.png")}
          />
          <Text style={{ color: colors.white, fontSize: 18 }}>
            mobile-onefx-boilerplate
          </Text>
        </View>
      </View>
    </View>
  );
}
