import 'react-native';
import React from 'react';
import tabBar from '../TabBarIcon';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
        name: 'name',
        focused: 'focused',
    };
  const tree = renderer.create(<tabBar {...props}>Snapshot test!</tabBar>).toJSON();

  expect(tree).toMatchSnapshot();
});
