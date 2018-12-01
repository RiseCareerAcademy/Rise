import React, { Component } from "react";
import { Button, Text, Container, Header, Content, Form, Item, Label, Input } from "native-base";
import { Platform, TouchableOpacity, ScrollView, StyleSheet, Image, View, ActivityIndicator } from "react-native";
import { AuthSession } from "expo";
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from "../components/StyledText";
import { connect } from 'react-redux';

import { login } from '../actions/user.actions';

export class SignIn extends React.Component {
  state = {
    result: null,
    email: "",
    password: "",
  };
  handleEmail = text => {
    this.setState({ email: text.trim() });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  validate = (email, password) => {
    // we are going to store errors for all fields
    // in a signle array
    // user can change email if only email is inputted
    // else they're changing their password
    // we will validate if email exists in iteration 2
    const errors = [];

    if (email.length == 0 && password.length == 0) {
      errors.push("please enter your email and password");
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

    if (errors.length == 0 || __DEV__) {
      this.props.login(email, password);
      return true
    } else {
      alert(errors);
      return false;
    }
  }
  render() {
    return (
      <Container>
        <Content>
          <Text style={styles.error}>{!this.props.loggingIn && this.props.error}</Text>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
              autoCapitalize="none"
              onChangeText={this.handleEmail}/>
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input
              autoCapitalize="none"
              secureTextEntry
              onChangeText={this.handlePassword}/>
            </Item>
          </Form>
        </Content>
        {this.props.registering ? (
          <ActivityIndicator animating size="large" />
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={ () =>
              this.validate(
                this.state.email,
                this.state.password
              )
            }
          >
            <Text style={styles.submitButtonText}> Next </Text>
          </TouchableOpacity>
        )}
        {/*<View>
          <Button full light onPress={() =>
            navigate('Main')
          }>
            <Text style={styles.greyText}>Next</Text>
          </Button>
        </View>*/}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
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
  error: {
    color: "red",
  },
});

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  error: state.user.error,
  email_address: state.user.email_address,
  first_name: state.user.first_name,
  profession: state.user.profession,
  last_name: state.user.last_name,
  biography: state.user.biography,
  profile_pic_URL: state.user.profile_pic_URL,
  loggingIn: state.user.loggingIn,
});

export default connect(mapStateToProps, {
  login,
})(SignIn);
