import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, MapStateToProps} from 'react-redux';
import {colors} from './colors';
import {AppState, Snippet} from './store';

const styles = StyleSheet.create({
  card: {
    marginBottom: 4,
    backgroundColor: colors.white
  },
  title: {
    margin: 4,
    fontSize: 20
  },
  desc: {
    margin: 4,
    fontSize: 16,
    color: colors.text01
  }
});

interface Props {
  snippets: Array<Snippet>;
}

const mapStateToProps: MapStateToProps<Props, {}, AppState> = (state: AppState) => {
  return {snippets: state.snippets};
};

export const NoteListContainer = connect<Props>(
  mapStateToProps
)(
  function NoteList({snippets}: Props) {
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
