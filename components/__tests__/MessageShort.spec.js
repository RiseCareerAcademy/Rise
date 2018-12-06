import 'react-native';
import React from 'react';
import shortM from '../MessageShort';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
        message: 'MyMessage',
        fromUser: 'FromUser',
        sentMessage: 'sentMessage',
    };
  const tree = renderer.create(<shortM {...props}>Snapshot test!</shortM>).toJSON();

  expect(tree).toMatchSnapshot();
});
