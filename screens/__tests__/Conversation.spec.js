import 'react-native';
import React from 'react';
import convo from '../Conversation';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
    };
  const tree = renderer.create(<convo {...props}>Snapshot test!</convo>).toJSON();

  expect(tree).toMatchSnapshot();
});
