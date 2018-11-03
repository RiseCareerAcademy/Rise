import 'react-native';
import React from 'react';
import Search from '../SearchScreen';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const props = {
  };
  const tree = renderer.create(<Search {...props}>Snapshot test!</Search>).toJSON();

  expect(tree).toMatchSnapshot();

});
