import "react-native";
import React from "react";
import { SignIn } from "../SignIn";
import { shallow } from "enzyme";
global.alert = jest.fn();

const setUpWrapper = props => shallow(<SignIn {...props} />);

it("returns error if all fields are not filled", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = setUpWrapper(props);
  expect(wrapper.instance().validate("", "")).toEqual(false);
});

it("returns error if email is less than 5 characters long", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = setUpWrapper(props);
  expect(wrapper.instance().validate("1234", "")).toEqual(false);
});

it("returns error if email contains @", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = setUpWrapper(props);
  expect(wrapper.instance().validate("12345", "")).toEqual(false);
});

it("returns error if email contains .", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = setUpWrapper(props);
  expect(wrapper.instance().validate("12345@", "")).toEqual(false);
});

it("returns error if password length is less than 6 characters long", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = setUpWrapper(props);
  expect(wrapper.instance().validate("user@email.com", "a")).toEqual(false);
});

it("returns true if all cases are passed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = setUpWrapper(props);
  expect(wrapper.instance().validate("user@email.com", "abcdef")).toEqual(true);
});

it("returns true if email state is changed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = setUpWrapper(props);
  const instance = wrapper.instance();
  instance.handleEmail("new@email.com");
  expect(instance.state.email).toEqual("new@email.com");
});

it("returns true if password state is changed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = setUpWrapper(props);
  const instance = wrapper.instance();
  instance.handlePassword("password");
  expect(instance.state.password).toEqual("password");
});

it("renders correctly", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
    login: () => {},
  };
  const wrapper = shallow(<SignIn {...props}>Snapshot test!</SignIn>);

  expect(wrapper).toMatchSnapshot();
});
