import 'react-native';
import React from 'react';
import Message from '../Message';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
        message: 'MyMessage',
        fromUser: 'FromUser',
        navigation: {
            navigate: () => {}
        },
    };
  const tree = renderer.create(<Message {...props}>Snapshot test!</Message>).toJSON();

  expect(tree).toMatchSnapshot();
});
