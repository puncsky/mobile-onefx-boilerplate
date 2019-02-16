import * as React from 'react';
import 'react-native';
// @ts-ignore
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import * as renderer from 'react-test-renderer';
import App from '../../App';

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
