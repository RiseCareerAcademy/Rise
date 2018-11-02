import 'react-native';
import React from 'react';
import Reg from '../StudentRegistration';
import renderer from 'react-test-renderer';
alert = jest.fn();

it("returns true if email state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    instance.handleEmail('user@email.com');
    expect(instance.state.email).toEqual('user@email.com')
});

it("returns true if password state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    instance.handlePassword('password');
    expect(instance.state.password).toEqual('password')
});

it("returns true if confirmPassword state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    instance.handleConfirmedPassword('password');
    expect(instance.state.confirmedPassword).toEqual('password')
});

it("returns true if skill state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    instance.handleSkills('skill');
    expect(instance.state.skills).toEqual('skill')
});

it("returns true if profession state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    instance.handleProfession('profession');
    expect(instance.state.profession).toEqual('profession')
});

it("returns true if name state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    instance.handleName('name');
    expect(instance.state.name).toEqual('name')
});

it("returns true if city state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    instance.handleCity('city');
    expect(instance.state.city).toEqual('city')
});

it("returns true if state's state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    instance.handleState('state');
    expect(instance.state.state).toEqual('state')
});

it('returns error if all fields are not filled', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    expect(instance.validate('', 'password', 'password', 'skills', 'profession', 'name', 'city', 'state', )).toEqual(false);

  it('returns error if email length is less than 5 characters long', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    expect(instance.validate('user', 'password', 'password', 'skills', 'profession', 'name', 'city', 'state', )).toEqual(false);
  });

  it('returns error if email doesnt have one @', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    expect(instance.validate('useremail', 'password', 'password', 'skills', 'profession', 'name', 'city', 'state', )).toEqual(false);
  });

  it('returns error if email doesnt have atleast one .', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    expect(instance.validate('user@emailcom', 'password', 'password', 'skills', 'profession', 'name', 'city', 'state', )).toEqual(false);
  });

  it('returns error if password length is less than 6', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    expect(instance.validate('user@email.com', 'pass', 'pass', 'skills', 'profession', 'name', 'city', 'state', )).toEqual(false);
  });

  it("returns error if password doesn't match confirmPassword", () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    expect(instance.validate('user@email.com', 'passwoord', 'password', 'skills', 'profession', 'name', 'city', 'state', )).toEqual(false);
  });

  it("returns error if password doesn't match confirmPassword", () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<Reg {...props} />).getInstance();
    expect(instance.validate('user@email.com', 'password', 'password', 'skills', 'profession', 'name', 'city', 'state', )).toEqual(true);
  });

it('renders correctly', () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const tree = renderer.create(<Reg {...props}>Snapshot test!</Reg>).toJSON();
    expect(tree).toMatchSnapshot();
});
