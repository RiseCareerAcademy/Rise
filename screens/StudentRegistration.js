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
    zipCode: "",
    city: "",
    state: ""
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  e;
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
  handleZipCode = text => {
    this.setState({ zipCode: text });
  };
  handleCity = text => {
    this.setState({ city: text });
  };
  handleState = text => {
    this.setState({ state: text });
  };

  validate = (
    email,
    password,
    confirmedPassword,
    skills,
    profession,
    name,
    zipCode,
    city,
    state
  ) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
    if (
      skills.length == 0 ||
      profession.length == 0 ||
      name.length == 0 ||
      zipCode.length == 0 ||
      city.length == 0 ||
      state.length == 0
    ) {
      errors.push("All fields must be filled");
    }else{
    if (email.length == 0 && password.length == 0) {
      errors.push("New email or password must be entered");
    } else if (password.length == 0 && email.length > 0) {
      if (email.length < 5) {
        errors.push("Email should be at least 5 charcters long");
      }
      if (email.split("").filter(x => x === "@").length !== 1) {
        errors.push("Email should contain a @");
      }
      if (email.indexOf(".") === -1) {
        errors.push("Email should contain at least one dot");
      }
    } else {
      if (password.length < 6) {
        errors.push("Password should be at least 6 characters long");
      }
      if (password != confirmedPassword) {
        errors.push("Password doesn't match");
      }
    }
  }

    const { navigate } = this.props.navigation;
    if (true) {
      navigate('Main');
    } else {
      alert(errors);
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
              <Label>Zip Code</Label>
              <Input
                placeholder="Enter your zip code"
                onChangeText={this.handleZipCode}
              />
            </Item>
            <Item stackedLabel last>
              <Label>city</Label>
              <Input
                placeholder="Enter your city"
                onChangeText={this.handleCity}
              />
            </Item>
            <Item stackedLabel last>
              <Label>state</Label>
              <Input
                placeholder="Enter your state"
                onChangeText={this.handleState}
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
                  this.state.zipCode,
                  this.state.city,
                  this.state.state
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
