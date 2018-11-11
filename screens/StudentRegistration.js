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
import { StyleSheet, TouchableOpacity, View, Image, Button } from "react-native";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";

import { registerMentee } from '../actions/user.actions';
import { DOMAIN } from "../config/url";

const uuidv1 = require('uuid/v1');

class MentorRegistration extends React.Component {
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
    image: null
  };

  // base64 = null;

  componentDidUpdate = prevProps => {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      const { navigate } = this.props.navigation;
      navigate("Main");
    }
  }

  handleImagePickerPress = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true, //Android editing only
        aspect: [4, 3], //Aspect ratio to maintain if user allowed to edit image
        // base64: true,
      });
      // this.base64 = result.base64;

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }
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
      city.length == 0 ||
      state.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      confirmedPassword.length == 0
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
    }

    if (errors.length == 0) {
      alert(errors);
      return true;
    } else {
      return false;
    }
  };

  handleSubmit = () => {
    const valid = this.validate(
      this.state.email,
      this.state.password,
      this.state.confirmedPassword,
      this.state.skills,
      this.state.profession,
      this.state.name,
      this.state.city,
      this.state.state
    );
    if (!valid && process.env.NODE_ENV !== "development") {
      return;
    }

    const user_id = uuidv1();  

    const uriParts = this.state.image.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const apiUrl = `http://${DOMAIN}/user/${user_id}/profilepic`;

    const formData = new FormData();
    formData.append('photo', {
      uri: this.state.image,
      name: `${user_id}.${fileType}`,
      type: `image/${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    fetch(apiUrl, options).then(response => {
      const mentee = {
        user_id,
        first_name: 'John',
        last_name: 'Doe',
        email_address: this.state.email,
        biography: '',
        zipcode: '53703',
        date_of_birth: '12/24/1996',
        area_of_study: this.state.profession,
        skills: this.state.skills,
        profile_pic_URL: `http://${DOMAIN}/user/${user_id}/profilepic`,
        hobbies: 'fake hobbies',
        password: this.state.password,
        name: this.state.name,
        city: this.state.city,
        state: this.state.state,
        // image: this.base64,
        image: this.state.image,
      };
  
      this.props.registerMentee(mentee);
    });

  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <View style={styles.headerColumn}>
              {this.state.image !== null && (
                <Image
                  style={styles.userImage}
                  source={{
                    uri: this.state.image
                  }}
                />
              )}

              <View style={styles.uploadBtnContainer}>
                <Button
                  onPress={this.handleImagePickerPress}
                  style={styles.uploadBtn}
                  title="Select image from Camera Roll"
                />
              </View>
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
            </View>
          </Form>
        </Content>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.handleSubmit}
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
  }
});

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

export default connect(
  mapStateToProps,
  { registerMentee }
)(MentorRegistration);
