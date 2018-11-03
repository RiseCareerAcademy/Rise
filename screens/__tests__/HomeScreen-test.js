import 'react-native';
import React from 'react';
import Home from '../HomeScreen';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };
  const tree = renderer.create(<Home {...props}>Snapshot test!</Home>).toJSON();

  expect(tree).toMatchSnapshot();
});
