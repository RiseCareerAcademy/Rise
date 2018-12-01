import "react-native";
import React from "react";
import { StudentRegistration } from "../StudentRegistration";
import { shallow } from "enzyme";
global.alert = jest.fn();

it("returns true if email state is changed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  instance.handleEmail("user@email.com");
  expect(instance.state.email).toEqual("user@email.com");
});

it("returns true if password state is changed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  instance.handlePassword("password");
  expect(instance.state.password).toEqual("password");
});

it("returns true if confirmPassword state is changed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  instance.handleConfirmedPassword("password");
  expect(instance.state.confirmedPassword).toEqual("password");
});

it("returns true if skill state is changed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  instance.handleSkills("skill");
  expect(instance.state.skills).toEqual("skill");
});

it("returns true if profession state is changed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  instance.handleProfession("profession");
  expect(instance.state.profession).toEqual("profession");
});

it("returns true if name state is changed", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  instance.handleName("name");
  expect(instance.state.name).toEqual("name");
});

it("returns error if all fields are not filled", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  expect(
    instance.validate(
      "",
      "password",
      "password",
      "skills",
      "profession",
      "name",
      "lastName",
      "44444",
      "biography",
      "image"
    )
  ).toEqual(false);
});

it("returns error if email length is less than 5 characters long", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  expect(
    instance.validate(
      "u@.c",
      "password",
      "password",
      "skills",
      "profession",
      "name",
      "lastName",
      "44444",
      "biography",
      "image"
    )
  ).toEqual(false);
});

it("returns error if email doesnt have one @", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  expect(
    instance.validate(
      "u@.@@c",
      "password",
      "password",
      "skills",
      "profession",
      "name",
      "lastName",
      "44444",
      "biography",
      "image"
    )
  ).toEqual(false);
});

it("returns error if email doesnt have atleast one .", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  expect(
    instance.validate(
      "user@emailcom",
      "password",
      "password",
      "skills",
      "profession",
      "name",
      "lastName",
      "44444",
      "biography",
      "image"
    )
  ).toEqual(false);
});

it("returns error if password length is less than 6", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  expect(
    instance.validate(
      "user@email.com",
      "pass",
      "pass",
      "skills",
      "profession",
      "name",
      "lastName",
      "44444",
      "biography",
      "image"
    )
  ).toEqual(false);
});

it("returns error if password doesn't match confirmPassword", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const instance = shallow(<StudentRegistration {...props} />).instance();
  expect(
    instance.validate(
      "user@email.com",
      "passwoord",
      "password",
      "skills",
      "profession",
      "name",
      "lastName",
      "44444",
      "biography",
      "image"
    )
  ).toEqual(false);
});

it("renders correctly", () => {
  const props = {
    navigation: {
      navigate: () => {},
    },
  };
  const wrapper = shallow(
    <StudentRegistration {...props}>Snapshot test!</StudentRegistration>
  );
  expect(wrapper).toMatchSnapshot();
});
