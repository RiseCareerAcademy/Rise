import React from "react";
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import {
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default class MentorRegistration extends React.Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: "",
    errors: [],
    skills: "",
    profession: "",
    name: "",
    lastName:"",
    zipcode:""
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleConfirmedPassword = text => {
    this.setState({ confirmedPassword: text });
  };
  handleSkills = text => {
    this.setState({ skills: text });
  };
  handleProfession = text => {
    this.setState({ profession: text });
  };
  handleName = text => {
    this.setState({ name: text });
  };
  handleLastName = text => {
    this.setState({ lastName: text });
  };
  handleZipCode = text => {
    this.setState({ zipcode: text });
  };

  validate = (
    email,
    password,
    confirmedPassword,
    skills,
    profession,
    name,
    lastName,
    zipcode
  ) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
    if (
      skills.length == 0 ||
      profession.length == 0 ||
      name.length == 0 ||
      email.length == 0 || 
      password.length == 0 ||
      confirmedPassword.length == 0 ||
      lastName.length == 0 ||
      zipcode.length == 0
    ) {
      errors.push("All fields must be filled");
    }
    else if (email.length < 5) {
      errors.push("Email should be at least 5 charcters long");
    }
    else if (email.split("").filter(x => x === "@").length !== 1) {
      errors.push("Email should contain one @");
    }
    else if (email.indexOf(".") === -1) {
      errors.push("Email should contain at least one dot");
    }
    else if (password.length < 6) {
      errors.push("Password should be at least 6 characters long");
    }
    else if (password != confirmedPassword) {
      errors.push(
        "Password doesn't match" + password + " " + confirmedPassword
      );
    }
    else if (zipcode.length != 5 && /^\d+$/.test(zipcode)){
      errors.push("zipcode must contain only numbers and be 5 characters long");
    }
    const { manifest } = Expo.Constants;
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
    : `api.example.com`;
    fetch('http://'+api+'/user/mentee', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            "user_id": 10002,
            "first_name": this.state.name, 
            "last_name": "john",
            "email_address": this.state.email, 
            "biography": "hi",
            "zipcode": this.state.zipcode, 
            "date_of_birth": "2/24/1996",
            "area_of_study": "Computer Science", 
            "skills": this.state.skills,
            "profile_pic_URL": "bill.com",
            "hobbies": "testiing hobbies",
      }),
    })//fetch
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(JSON.stringify(responseJson));
      })
    .catch((error) => {
      console.error("error is " + error);
    });
    const { navigate } = this.props.navigation;
    if (errors.length == 0 /* && process.env.NODE_ENV !== 'development' */) {
      navigate('Main');
      return true;
    } else {
      alert(errors);
      return false;
    }
    
  };


  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                placeholder="Enter your email"
                onChangeText={this.handleEmail}
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                placeholder="Enter your password"
                onChangeText={this.handlePassword}
              />
            </Item>
            <Item stackedLabel>
              <Label>Confirm Password</Label>
              <Input
                placeholder="Confirm Password Change"
                onChangeText={this.handleConfirmedPassword}
              />
            </Item>
            <Item stackedLabel>
              <Label>Skills</Label>
              <Input
                placeholder="Enter skills you want to learn"
                onChangeText={this.handleSkills}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Profession</Label>
              <Input
                placeholder="Enter profession you want to learn"
                onChangeText={this.handleProfession}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Name</Label>
              <Input
                placeholder="Enter your name"
                onChangeText={this.handleName}
              />
            </Item>
            <Item stackedLabel last>
              <Label>lastName</Label>
              <Input
                placeholder="Enter your last name"
                onChangeText={this.handleLastName}
              />
            </Item>
            <Item stackedLabel last>
              <Label>zipcode</Label>
              <Input
                placeholder="Enter your zipcode"
                onChangeText={this.handleZipCode}
              />
            </Item>
          </Form>
        </Content>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            this.validate(
              this.state.email,
              this.state.password,
              this.state.confirmedPassword,
              this.state.skills,
              this.state.profession,
              this.state.name,
              this.state.lastName,
              this.state.zipcode
            )
          }
          }
        >
          <Text style={styles.submitButtonText}> Next </Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#000000",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#000000",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonStyle: {
    margin: 10
  },
  greyText: {
    color: "grey"
  },
  contentContainer: {
    paddingTop: 30
  },
  container: {
    margin: 5
  }
});
