import 'react-native';
import React from 'react';
import message from '../Messages';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };
  const tree = renderer.create(<message {...props}>Snapshot test!</message>).toJSON();

  expect(tree).toMatchSnapshot();
});
