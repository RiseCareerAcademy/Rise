import 'react-native';
import React from 'react';
import { SearchScreen } from '../SearchScreen';
import { shallow } from 'enzyme';

// jest.mock('../config/url', () => 'api.example.com');
// jest.mock('expo');

it('renders correctly', () => {
  const props = {
      navigation: {
        getParam: () => {
            return 'Tracy';
        },
          navigate: () => {},
      },
      getAllMentors: jest.fn(),
      getAllMentees: jest.fn(),
      getAllMatches: jest.fn(),
  };
  const wrapper = shallow(<SearchScreen {...props}>Snapshot test!</SearchScreen>);

  expect(wrapper).toMatchSnapshot();

});
