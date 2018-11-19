import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Separator } from 'native-base';

import { logoutUser } from '../actions/user.actions';

export class Settings extends Component {
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

  handleLogout = () => {
    this.props.logoutUser();
  }

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

  handleEditProfile = () => {
    const { navigate } = this.props.navigation;
    navigate('EditProfile');
  }

  handleChangePassword = () => {
    const { navigate } = this.props.navigation;
    navigate('Password');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <ListItem icon onPress={this.handleEditProfile}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="md-person" />
              </Button>
            </Left>
            <Body>
              <Text>Edit Profile</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon onPress={this.handleChangePassword}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }} >
                <Icon active name="lock" />
              </Button>
            </Left>
            <Body>
              <Text>Change Password</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <Separator bordered>
            <Text></Text>
          </Separator>
          <ListItem icon onPress={this.handleLogout}>
            <Left>
              <Button style={{ backgroundColor: "grey" }} >
                <Icon active name="log-out" />
              </Button>
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
    // return (


    //     <TouchableOpacity
    //       style={styles.submitButton}
    //       onPress={this.handleEditProfile}
    //     >
    //       <Text style={styles.submitButtonText}> Edit Profile </Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity
    //       style={styles.submitButton}
    //       onPress={this.handleChangePassword}
    //     >
    //       <Text style={styles.submitButtonText}> Change Password </Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity
    //       style={styles.submitButton}
    //       onPress={this.handleLogout}
    //     >
    //       <Text style={styles.submitButtonText}> Logout </Text>
    //     </TouchableOpacity>
    //   </View>
    // );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  logoutUser,
})(Settings);

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
