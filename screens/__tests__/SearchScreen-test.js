import 'react-native';
import React from 'react';
import Search from '../SearchScreen';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const props = {
      navigation: {
        getParam: () => {
            return 'Tracy';
        },
          navigate: () => {},
      }
  };
  const tree = renderer.create(<Search {...props}>Snapshot test!</Search>).toJSON();

  expect(tree).toMatchSnapshot();

});

it('returns scores and matches on Tracy', () => {
    const props = {
      navigation: {
        getParam: () => {
            return 'Tracy';
        },
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Search {...props} />).getInstance();
    expect(instance.search( [
        ["Daniel Ng"],
        ["Software Developer"],
        ["JQuery", "Python", "UX"], //should be number 4
        ["Tracy Lewis"],
        [""],
        ["UX", "Prototyping"], //should be number 3
        ["Kevin Mui"],
        ["Product Manager"],
        [""], //should be number 2
        ["Lewis Tracy"],
        ["Product Manager"],
        ["UX"], //should be number 1
        ["Tone Yu"],
        ["Nurse"],
        ["Birthing", "Yelling", "Running"] //should not be in the results
      ])).toEqual({"matches": [["Tracy Lewis"], ["Lewis Tracy"]], "scores": [2, 2]},['Tracey Lewis','Lewis Tracy']);
  });
  it('returns empty scores and matches on empty input', () => {
    const props = {
      navigation: {
        getParam: () => {
            return '';
        },
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Search {...props} />).getInstance();
    expect(instance.search( [
        ["Daniel Ng"],
        ["Software Developer"],
        ["JQuery", "Python", "UX"], //should be number 4
        ["Tracy Lewis"],
        [""],
        ["UX", "Prototyping"], //should be number 3
        ["Kevin Mui"],
        ["Product Manager"],
        [""], //should be number 2
        ["Lewis Tracy"],
        ["Product Manager"],
        ["UX"], //should be number 1
        ["Tone Yu"],
        ["Nurse"],
        ["Birthing", "Yelling", "Running"] //should not be in the results
      ])).toEqual({"matches": [], "scores": []});
  });
  it('returns empty scores and matches on input Tracy and empty database', () => {
    const props = {
      navigation: {
        getParam: () => {
            return 'Tracy';
        },
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Search {...props} />).getInstance();
    expect(instance.search([])).toEqual({"matches": [], "scores": []});
  });