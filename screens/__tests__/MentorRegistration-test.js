import 'react-native';
import React from 'react';
import { MentorRegistration } from '../MentorRegistration';
import renderer from 'react-test-renderer';
alert = jest.fn();




it("returns true if email state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    instance.handleEmail('user@email.com');
    expect(instance.state.email).toEqual('user@email.com')
});

it("returns true if password state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    instance.handlePassword('password');
    expect(instance.state.password).toEqual('password')
});

it("returns true if confirmPassword state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    instance.handleConfirmedPassword('password');
    expect(instance.state.confirmedPassword).toEqual('password')
});

it("returns true if skill state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    instance.handleSkills('skill');
    expect(instance.state.skills).toEqual('skill')
});

it("returns true if profession state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<MentorRegistration{...props} />).getInstance();
    instance.handleProfession('profession');
    expect(instance.state.profession).toEqual('profession')
});

it("returns true if first name state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    instance.handleFirstName('name');
    expect(instance.state.first_name).toEqual('name')
});


it("returns true if last name state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    instance.handleLastName('lastname');
    expect(instance.state.last_name).toEqual('lastname')
});



it("returns true if zipcode state is changed", () => {
    const props = {
        navigation: {
            navigate: () => { }
        },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    instance.handleZipCode('55555');
    expect(instance.state.zipcode).toEqual('55555')
});




it('returns error if all fields are not filled', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    expect(instance.validate('',  'password', 'skills', 'profession', 'user@email.com', 'FirstName','LasrName','55555')).toEqual(false);
  });


  it('returns error if email length is less than 5 characters long', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    expect(instance.validate('password',  'password', 'skills', 'profession', 'u@.', 'FirstName','LasrName','55555')).toEqual(false);
  });

  it('returns error if email doesnt have one @', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    expect(instance.validate('password',  'password', 'skills', 'profession', 'uemail.com', 'FirstName','LasrName','55555')).toEqual(false);
  });

  it('returns error if email doesnt have atleast one .', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    expect(instance.validate('password',  'password', 'skills', 'profession', 'useremail@', 'FirstName','LasrName','55555')).toEqual(false);
  });




  it('returns error if password length is less than 6', () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    expect(instance.validate('pass',  'pass', 'skills', 'profession', 'user@email.com', 'FirstName','LasrName','55555')).toEqual(false);
  });



  it("returns error if password doesn't match confirmPassword", () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    expect(instance.validate('pass',  'password', 'skills', 'profession', 'user@email.com', 'FirstName','LastName','55555')).toEqual(false);
  });


  it("returns error if zipcode length is not 5", () => {
    const props = {
      navigation: {
        navigate: () => { }
      },
    };
    const instance = renderer.create(<MentorRegistration {...props} />).getInstance();
    expect(instance.validate('password',  'password', 'skills', 'profession', 'user@email.com', 'FirstName','LastName','4444')).toEqual(false);
  });



//render test
it('renders correctly', () => {
    const props = {
        navigation:{
            naviagte: ()=> {},
        }
    };
  const tree = renderer.create(<MentorRegistration {...props}>Snapshot test!</MentorRegistration>).toJSON();

  expect(tree).toMatchSnapshot();
});