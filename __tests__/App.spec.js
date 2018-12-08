import 'react-native';
import React from 'react';
import App from '../App';
import { shallow } from "enzyme";
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

jest.mock('../config/url', () => 'api.example.com');

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const wrapper = shallow(<App skipLoadingScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
