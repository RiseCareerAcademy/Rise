import 'react-native';
import React from 'react';
import settings from '../Settings';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
    };
  const tree = renderer.create(<settings {...props}>Snapshot test!</settings>).toJSON();

  expect(tree).toMatchSnapshot();
});
