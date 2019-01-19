import 'react-native';
import React from 'react';
import { MonoText } from '../styled-text';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
