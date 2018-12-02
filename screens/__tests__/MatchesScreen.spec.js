import 'react-native';
import React from 'react';
import { MatchesScreen } from '../MatchesScreen';
import { shallow } from 'enzyme';

it('renders correctly', () => {
    const props = {
      user_id: '1',
      getSuggestedMenteeMatches: jest.fn(),
      getSuggestedMentorMatches: jest.fn(),
      users: [],
    };
  const wrapper = shallow(<MatchesScreen {...props}>Snapshot test!</MatchesScreen>);

  expect(wrapper).toMatchSnapshot();
});
