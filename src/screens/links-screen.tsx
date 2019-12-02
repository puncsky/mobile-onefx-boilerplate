// @ts-ignore
import { ExpoLinksView } from "@expo/samples";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TFuncType } from "../types/screen-props";
export class LinksScreen extends React.Component {
  public static navigationOptions = ({
    screenProps: { t }
  }: {
    screenProps: { t: TFuncType };
  }) => ({
    title: t("links")
  });

  public render(): JSX.Element {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
         * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
