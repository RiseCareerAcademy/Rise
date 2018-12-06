import "react-native";
import React from "react";
import { MentorRegistration } from "../MentorRegistration";
import { shallow } from "enzyme";
global.alert = jest.fn();
const props = {
  navigation: {
    navigate: () => {},
  },
};

const setupInstance = () =>
  shallow(<MentorRegistration {...props} />).instance();

it("returns true if email state is changed", () => {
  const instance = setupInstance();
  instance.handleEmail("user@email.com");
  expect(instance.state.email_address).toEqual("user@email.com");
});

it("returns true if password state is changed", () => {
  const instance = setupInstance();
  instance.handlePassword("password");
  expect(instance.state.password).toEqual("password");
});

it("returns true if confirmPassword state is changed", () => {
  const instance = setupInstance();
  instance.handleConfirmedPassword("password");
  expect(instance.state.confirmedPassword).toEqual("password");
});

it("returns true if skill state is changed", () => {
  const instance = setupInstance();
  instance.handleSkills("skill");
  expect(instance.state.skills).toEqual("skill");
});

it("returns true if profession state is changed", () => {
  const instance = setupInstance();
  instance.handleProfession("profession");
  expect(instance.state.profession).toEqual("profession");
});

it("returns true if first name state is changed", () => {
  const instance = setupInstance();
  instance.handleFirstName("name");
  expect(instance.state.first_name).toEqual("name");
});

it("returns true if last name state is changed", () => {
  const instance = setupInstance();
  instance.handleLastName("lastname");
  expect(instance.state.last_name).toEqual("lastname");
});

it("returns true if zipcode state is changed", () => {
  const instance = setupInstance();
  instance.handleZipCode("55555");
  expect(instance.state.zipcode).toEqual("55555");
});

it("returns error if all fields are not filled", () => {
  const instance = setupInstance();
  expect(
    instance.validate(
      "email@hello.com",
      "password",
      "password",
      "",
      "profession",
      "FirstName",
      "LasrName",
      "55555",
      "Bio",
    )
  ).toEqual(false);
});

it("returns error if email length is less than 5 characters long", () => {
  const instance = setupInstance();
  expect(
    instance.validate(
      "e@.c",
      "password",
      "password",
      "skills",
      "profession",
      "FirstName",
      "LasrName",
      "55555",
      "Bio",
    )
  ).toEqual(false);
});

it("returns error if email doesnt have one @", () => {
  const instance = setupInstance();
  expect(
    instance.validate(
      "email.com",
      "password",
      "password",
      "skills",
      "profession",
      "FirstName",
      "LasrName",
      "55555",
      "Bio",
    )
  ).toEqual(false);
});

it("returns error if email doesnt have atleast one .", () => {
  const instance = setupInstance();
  expect(
    instance.validate(
      "email@com",
      "password",
      "password",
      "skills",
      "profession",
      "FirstName",
      "LasrName",
      "55555",
      "Bio",
    )
  ).toEqual(false);
});

it("returns error if password length is less than 6", () => {
  const instance = setupInstance();
  expect(
    instance.validate(
      "email@com",
      "pass",
      "pass",
      "skills",
      "profession",
      "FirstName",
      "LasrName",
      "55555",
      "Bio",
    )
  ).toEqual(false);
});

it("returns error if password doesn't match confirmPassword", () => {
  const instance = setupInstance();
  expect(
    instance.validate(
      "email@com",
      "pass",
      "password",
      "skills",
      "profession",
      "FirstName",
      "LasrName",
      "55555",
      "Bio",
    )
  ).toEqual(false);
});

it("returns error if zipcode length is not 5", () => {
  const instance = setupInstance();
  expect(
    instance.validate(
      "email@com",
      "pass",
      "pass",
      "skills",
      "profession",
      "FirstName",
      "LasrName",
      "4444",
      "Bio",
    )
  ).toEqual(false);
});

//render test
it("renders correctly", () => {
  const props = {
    navigation: {
      naviagte: () => {},
    },
  };
  const wrapper = shallow(
    <MentorRegistration {...props}>Snapshot test!</MentorRegistration>
  );

  expect(wrapper).toMatchSnapshot();
});
