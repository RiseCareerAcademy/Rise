import React from "react";
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Header,
  Right,
  Icon,
  Button,
  Body,
  Left,
  Title
} from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";

import { registerMentee } from "../actions/user.actions";
import { DOMAIN } from "../config/url";

const uuidv1 = require("uuid/v1");

export class StudentRegistration extends React.Component {
  static navigationOptions = {
    header: null,
  }

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
        aspect: [4, 3] //Aspect ratio to maintain if user allowed to edit image
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

  handleBiography = text => {
    this.setState({ biography: text });
  }

  validate = (
    email,
    password,
    confirmedPassword,
    skills,
    profession,
    name,
    lastName,
    zipcode,
    biography,
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
      zipcode.length == 0 ||
      biography.length == 0
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
      this.state.email,
      this.state.password,
      this.state.confirmedPassword,
      this.state.skills,
      this.state.profession,
      this.state.name,
      this.state.lastName,
      this.state.zipcode,
      this.state.biography,
    );
    if (!valid && process.env.NODE_ENV !== "development") {
      return;
    }

    const mentee = {
      first_name: this.state.name,
      last_name: this.state.lastName,
      email_address: this.state.email,
      biography: "hi",
      zipcode: this.state.zipcode,
      date_of_birth: "12/24/1996",
      skills: this.state.skills,
      hobbies: "fake hobbies",
      profession: this.state.profession,
      password: this.state.password,
      city: this.state.city,
      state: this.state.state,
      image: this.state.image,
      uri: this.state.image
    };

    this.props.registerMentee(mentee);
  };

  handlePreviewPress = () => {
    this.props.navigation.navigate("Preview", {
      profile_pic_URL: this.state.image,
      first_name: this.state.name,
      last_name: this.state.lastName,
      zipcode: this.state.zipcode,
      biography: this.state.biography,
      profession: this.state.profession,
      skills: this.state.skills,
      preview: true
    });
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container >
        <Header>
          <Left>
            <Button transparent onPress={this.handleBackPress}>
              <Icon name="md-arrow-round-back" />
            </Button>
          </Left>
          <Body>
            <Title>Student Registration</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.handlePreviewPress}>
              <Icon name="eye" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Text style={styles.error}>
            {!this.props.registering && this.props.error}
          </Text>
          <Form>
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
              >
                <Text>Select image from Camera Roll</Text>
              </Button>
            </View>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                placeholder="Enter your email"
                onChangeText={this.handleEmail}
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                autoCapitalize="none"
                placeholder="Enter your password"
                onChangeText={this.handlePassword}
                secureTextEntry={true}
              />
            </Item>
            <Item stackedLabel>
              <Label>Confirm Password</Label>
              <Input
                autoCapitalize="none"
                placeholder="Confirm Password Change"
                onChangeText={this.handleConfirmedPassword}
                secureTextEntry={true}
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
              <Label>zipcode</Label>
              <Input
                placeholder="Enter your zipcode"
                onChangeText={this.handleZipCode}
              />
            </Item>
            <Item stackedLabel>
              <Label>Biography</Label>
              <Input
                placeholder="Enter your bio"
                onChangeText={this.handleBiography}
              />
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
  error: state.user.error
});

export default connect(
  mapStateToProps,
  { registerMentee }
)(StudentRegistration);
