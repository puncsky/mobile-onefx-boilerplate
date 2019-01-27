import { ExpoConfigView } from '@expo/samples';
import React from 'react';

export default class SettingsScreen extends React.Component {
  public static navigationOptions = {
    title: 'app.json'
  };

  public render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
