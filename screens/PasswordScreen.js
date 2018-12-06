import React from "react";
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
} from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import { registerMentor, updateUser } from "../actions/user.actions";

export class Password extends React.Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: "",
    errors: [],
    skills: "",
    profession: "",
    first_name: "",
    city: "",
    state: "",
    image: null,
    last_name: "",
    zipcode: "",
  };

  handlePassword = text => {
    this.setState({ password: text });
  }

  handleConfirmPassword = text => {
    this.setState({ confirmedPassword: text });
  }

  validate = (password, confirmedPassword) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
    if (
    password.length === 0 ||
    confirmedPassword.length === 0
    ) {
      errors.push("All fields must be filled");
    } else if (password.length < 5) {
    errors.push("Email should be at least 5 charcters long");
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
    );
    if (!valid && !__DEV__) {
      return;
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.error}>
            {!this.props.registering && this.props.error}
          </Text>
          <Form>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
        onChange={this.handlePassword}
        secureTextEntry
              />
            </Item>
            <Item stackedLabel last>
              <Label>Confirm Password</Label>
              <Input
        secureTextEntry
                onChange={this.handleConfirmPassowrd} />
            </Item>
          </Form>
        </Content>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.handleSubmit}
          >
            <Text style={styles.submitButtonText}> Save </Text>
          </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  userImage: {
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#000000",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonStyle: {
    margin: 10,
  },
  greyText: {
    color: "grey",
  },
  contentContainer: {
    paddingTop: 30,
  },
  container: {
    margin: 5,
  },
  uploadBtnContainer: {
    margin: "auto",
  },
  uploadBtn: {
    margin: "auto",
  },
  error: {
    color: "red",
  },
});

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  registering: state.user.registering,
  error: state.user.error,
  email_address: state.user.email_address,
  first_name: state.user.first_name,
  profession: state.user.profession,
  last_name: state.user.last_name,
  biography: state.user.biography,
  profile_pic_URL: state.user.profile_pic_URL,
  zipcode: state.user.zipcode,
  skills: state.user.skills,
});

export default connect(
  mapStateToProps,
  { registerMentor, updateUser }
)(Password);
