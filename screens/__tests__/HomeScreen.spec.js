import 'react-native';
import React from 'react';
import { HomeScreen } from '../HomeScreen';
import { shallow } from 'enzyme';

// jest.mock('expo');

jest.mock('expo', () => ({
    AuthSession: {
        getRedirectUrl: () => {},
        startAsync: () => ({
            params: {
                state: 'MyLinkedinState',
                code: 'MyLinkedinCode',
            },
        }),
    },
}));

it('renders correctly', () => {
    const props = {
        navigation: {
            navigate: () => {},
        },
    };
  const wrapper = shallow(<HomeScreen {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders with validi set', () => {
    const props = {
        navigation: {
            navigate: () => {},
        },
    };
  const wrapper = shallow(<HomeScreen {...props} />);
  wrapper.setState({ validi: true });
  expect(wrapper).toMatchSnapshot();
});

it('renders with authUrl set', () => {
    const props = {
        navigation: {
            navigate: () => {},
        },
    };
  const wrapper = shallow(<HomeScreen {...props} />);
  wrapper.setState({ authUrl: 'http://linkedin.com' });
  expect(wrapper).toMatchSnapshot();
});

it('renders with result set', () => {
    const props = {
        navigation: {
            navigate: () => {},
        },
    };
  const wrapper = shallow(<HomeScreen {...props} />);
  wrapper.setState({ result: 'MyResult' });
  expect(wrapper).toMatchSnapshot();
});

it('opens linkedin', async () => {
    const props = {
        navigation: {
            navigate: () => {},
        },
        registerWithLinkedin: jest.fn(),
    };

    const wrapper = shallow(<HomeScreen {...props} />);
    await wrapper.instance().handleMentorPress();
    expect(props.registerWithLinkedin).toBeCalled();
});
