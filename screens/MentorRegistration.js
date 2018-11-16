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
  TouchableOpacity,
  View,
  Image,
  Button,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import { registerMentor } from "../actions/user.actions";
import { DOMAIN } from "../config/url";

export class MentorRegistration extends React.Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: "",
    errors: [],
    skills: "",
    profession: "",
    name: "",
    city: "",
    state: "",
    image: null,
    lastName: "",
    zipcode: ""
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
  handleZipCode = text => {
    this.setState({ zipcode: text });
  };

  handleEmail = text => {
    this.setState({ email: text });
  };

  handleOccupation = text => {
    this.setState({ profession: text });
  };

  handleFirstName = text => {
    this.setState({ first_name: text });
  };

  handleLastName = text => {
    this.setState({ last_name: text });
  };

  handleBiography = text => {
    this.setState({ biography: text });
  };

  validate = (password, confirmedPassword, skills, zipcode) => {
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
    } else if (email.length < 5) {
      errors.push("Email should be at least 5 charcters long");
    } else if (email.split("").filter(x => x === "@").length !== 1) {
      errors.push("Email should contain one @");
    } else if (email.indexOf(".") === -1) {
      errors.push("Email should contain at least one dot");
    } else if (password.length < 6) {
      errors.push("Password should be at least 6 characters long");
    } else if (password != confirmedPassword) {
      errors.push(
        "Password doesn't match" + password + " " + confirmedPassword
      );
    } else if (zipcode.length != 5 && /^\d+$/.test(zipcode)) {
      errors.push("zipcode must contain only numbers and be 5 characters long");
    }
    if (errors.length == 0) {
      // alert(errors);
      return true;
    } else {
      return false;
    }
  };

  handleSubmit = () => {
    const valid = this.validate(
      this.state.password,
      this.state.confirmedPassword,
      this.state.skills,
      this.state.zipcode
    );
    if (!valid && process.env.NODE_ENV !== "development") {
      return;
    }

    const mentor = {
      first_name: this.state.first_name || this.props.first_name,
      last_name: this.state.last_name || this.props.last_name,
      email_address: this.state.email_address || this.props.email_address,
      biography: this.state.biography || this.props.biography,
      zipcode: this.state.zipcode,
      date_of_birth: "12/24/1996",
      skills: this.state.skills,
      hobbies: "fake hobbies",
      occupation: this.state.occupation || this.props.occupation,
      password: this.state.password,
      image: this.props.profile_pic_URL
    };

    this.props.registerMentor(mentor);
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.error}>
            {!this.props.registering && this.props.error}
          </Text>
          <Form>
            <Image
              style={styles.userImage}
              source={{
                uri: this.props.profile_pic_URL
              }}
            />

            <Item stackedLabel>
              <Label>Email</Label>
              <Input placeholder={this.props.email_address} onChange={this.handleEmail} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                onChangeText={this.handlePassword}
                secureTextEntry={true}
              />
            </Item>
            <Item stackedLabel>
              <Label>Confirm Password</Label>
              <Input
                onChangeText={this.handleConfirmedPassword}
                secureTextEntry={true}
              />
            </Item>
            <Item stackedLabel>
              <Label>Skills</Label>
              <Input
                onChangeText={this.handleSkills}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Profession</Label>
              <Input placeholder={this.props.occupation} onChange={this.handleOccupation} />
            </Item>
            <Item stackedLabel last>
              <Label>Name</Label>
              <Input placeholder={this.props.first_name} onChange={this.handleFirstName} />
            </Item>
            <Item stackedLabel last>
              <Label>lastName</Label>
              <Input placeholder={this.props.last_name} onChange={this.handleLastName} />
            </Item>
            <Item stackedLabel last>
              <Label>zipcode</Label>
              <Input
                onChangeText={this.handleZipCode}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Biography</Label>
              <Input placeholder={this.props.biography} onChange={this.handleBiography} />
            </Item>
          </Form>
        </Content>
        {this.props.registering ? (
          <ActivityIndicator animating size="large" />
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.handleSubmit}
          >
            <Text style={styles.submitButtonText}> Next </Text>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  userImage: {
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170
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
  },
  uploadBtnContainer: {
    margin: "auto"
  },
  uploadBtn: {
    margin: "auto"
  },
  error: {
    color: "red"
  }
});

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  registering: state.user.registering,
  error: state.user.error,
  email_address: state.user.email_address,
  first_name: state.user.first_name,
  occupation: state.user.occupation,
  last_name: state.user.last_name,
  biography: state.user.biography,
  profile_pic_URL: state.user.profile_pic_URL,
  error: state.user.error,
});

export default connect(
  mapStateToProps,
  { registerMentor }
)(MentorRegistration);
