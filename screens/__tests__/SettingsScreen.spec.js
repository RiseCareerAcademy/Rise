import 'react-native';
import React from 'react';
import SettingsScreen from '../SettingsScreen';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
    };
  const tree = renderer.create(<SettingsScreen {...props}>Snapshot test!</SettingsScreen>).toJSON();

  expect(tree).toMatchSnapshot();
});
