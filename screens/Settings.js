import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

class Inputs extends Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: "",
    errors: []
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
  validate = (email, password, confirmedPassword) => {
    // we are going to store errors for all fields
    // in a signle array
    // user can change email if only email is inputted
    // else they're changing their password
    // we will validate if email exists in iteration 2
    const errors = [];

    if (email.length == 0 && password.length == 0) {
      errors.push("New email or password must be entered");
    } else if (password.length == 0 && email.length > 0) {
      if (email.length < 5) {
        errors.push("Email should be at least 5 charcters long");
      }
      if (email.split("").filter(x => x === "@").length !== 1) {
        errors.push("Email should contain one @");

      }
      if (email.indexOf(".") === -1) {
        errors.push("Email should contain at least one dot");
      }
    } else {
      if (password.length < 6) {
        errors.push("Password should be at least 6 characters long");
      }
      if (password != confirmedPassword) {
        errors.push(
          "Password doesn't match" + password + " " + confirmedPassword
        );
      }
    }

    if (errors.length == 0) {
      alert("New changes are saved");
      return true;
    } else {
      alert(errors);
      return false;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Change Email"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Change Password"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Confirm Password Change"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          onChangeText={this.handleConfirmedPassword}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={ () =>
            this.validate(
              this.state.email,
              this.state.password,
              this.state.confirmedPassword
            )
          }
        >
          <Text style={styles.submitButtonText}> Save </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Inputs;

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
  }
});
