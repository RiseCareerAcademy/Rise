import 'react-native';
import React from 'react';
import Match from '../MatchesScreen';
import renderer from 'react-test-renderer';

//render test
it('renders correctly', () => {
    const props = {
    };
  const tree = renderer.create(<Match {...props}>Snapshot test!</Match>).toJSON();

  expect(tree).toMatchSnapshot();
});


//create unit test for no match
//create unit test for match
    //2 exact match
    //1. match profession but no skill
    //2. no profession match but skills match
    //3. two people with same profession but one with more skills