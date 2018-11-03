import 'react-native';
import React from 'react';
import signIn from '../SignIn';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };
  const tree = renderer.create(<settings {...props}>Snapshot test!</settings>).toJSON();

  expect(tree).toMatchSnapshot();
});
