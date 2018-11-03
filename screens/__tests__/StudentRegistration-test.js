import 'react-native';
import React from 'react';
import Reg from '../StudentRegistration';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };
  const tree = renderer.create(<Reg {...props}>Snapshot test!</Reg>).toJSON();

  expect(tree).toMatchSnapshot();
});
