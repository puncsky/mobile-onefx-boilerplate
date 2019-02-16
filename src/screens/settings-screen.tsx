// @ts-ignore
import { ExpoConfigView } from '@expo/samples';
import * as React from 'react';

export default class SettingsScreen extends React.Component {
  public static navigationOptions: {title: string} = {
    title: 'app.json'
  };

  public render(): JSX.Element {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
