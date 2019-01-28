import 'react-native';
import * as React from 'react';
import App from '../../App';
import * as renderer from 'react-test-renderer';
// @ts-ignore
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders the root without loading screen', async () => {
  //   const tree = renderer.create(<App skipLoadingScreen={true} />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
