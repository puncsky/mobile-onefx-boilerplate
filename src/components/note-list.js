import {StyleSheet, Text, View} from "react-native";
import {colors} from "./colors";
import {connect} from "react-redux";
import React from "react";

const styles = StyleSheet.create({
  card: {
    marginBottom: 4,
    backgroundColor: colors.white,
  },
  title: {
    margin: 4,
    fontSize: 20,
  },
  desc: {
    margin: 4,
    fontSize: 16,
    color: colors.text01
  }
});

export const NoteListContainer = connect(state => ({snippets: state.snippets}))(
  function NoteList({snippets}) {
    return (
      <View style={{flex: 1, backgroundColor: colors.black80}}>
        {snippets.map((s, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.desc}>{s.abstract}</Text>
          </View>
        ))}
      </View>
    );
  }
);
