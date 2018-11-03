import 'react-native';
import React from 'react';
import Home from '../HomeScreen';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

// jest.mock('expo');

jest.mock('expo', () => ({
    AuthSession: {
        getRedirectUrl: () => {},
        startAsync: () => ({ 
            params: {
                state: 'MyLinkedinState',
                code: 'MyLinkedinCode'
            },
        }),
    },
}));

it('renders correctly', () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };
  const wrapper = shallow(<Home {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders with validi set', () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };
  const wrapper = shallow(<Home {...props} />);
  wrapper.setState({ validi: true });
  expect(wrapper).toMatchSnapshot();
});

it('renders with authUrl set', () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };
  const wrapper = shallow(<Home {...props} />);
  wrapper.setState({ authUrl: 'http://linkedin.com' });
  expect(wrapper).toMatchSnapshot();
});

it('renders with result set', () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };
  const wrapper = shallow(<Home {...props} />);
  wrapper.setState({ result: 'MyResult' });
  expect(wrapper).toMatchSnapshot();
});

it('opens linkedin', async () => {
    const props = {
        navigation: {
            navigate: () => {}
        },
    };

    const wrapper = shallow(<Home {...props} />);
    await wrapper.instance().handleMentorPress();
    expect(wrapper.state('result')).toEqual({"params": {"code": "MyLinkedinCode", "state": "MyLinkedinState"}});
    expect(wrapper.state('validState')).toBeDefined();
    expect(wrapper.state('responseState')).toEqual('MyLinkedinState');
});
