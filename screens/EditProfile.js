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
  Left,
  Button,
  Icon,
  Body,
  Title,
} from "native-base";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";

import { registerMentor, updateUser } from "../actions/user.actions";

export class EditProfileScreen extends React.Component {
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
    first_name: "",
    city: "",
    state: "",
    image: null,
    last_name: "",
    zipcode: "",
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

  handleProfession = text => {
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

  validate = (skills, profession, email, name, lastName, zipcode) => {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
    if (
      skills.length == 0 ||
      profession.length == 0 ||
      name.length == 0 ||
      email.length == 0 ||
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
      this.state.skills,
      this.state.profession,
      this.state.email,
      this.state.first_name,
      this.state.last_name,
      this.state.zipcode
    );
    if (!valid && process.env.NODE_ENV !== "development") {
      return;
    }

    const user = {
      biography: this.state.biography || this.props.biography,
      zipcode: this.state.zipcode,
      skills: this.state.skills,
      hobbies: "fake hobbies",
      profession: this.state.profession || this.props.profession,
    };

    this.props.updateUser(user);
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.handleBackPress}>
              <Icon name="md-arrow-round-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit Profile</Title>
          </Body>
        </Header>
        <Content>
          <Text style={styles.error}>
            {!this.props.registering && this.props.error}
          </Text>
          <Form>
            <Image
              style={styles.userImage}
              source={{
                uri: this.props.profile_pic_URL,
              }}
            />
            {/* <Item stackedLabel>
              <Label>Add New Skills (separated by commas)</Label>
              <Input
                placeholder={this.props.skills}
                onChangeText={this.handleSkills}
              />
            </Item> */}
            {/* <Item stackedLabel last>
              <Label>Profession</Label>
              <Input
                placeholder={this.props.profession}
                onChangeText={this.handleProfession}
              />
            </Item> */}
            <Item stackedLabel last>
              <Label>zipcode</Label>
              <Input
                placeholder={this.props.zipcode}
                onChangeText={this.handleZipCode}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Biography</Label>
              <Input
                placeholder={this.props.biography}
                onChangeText={this.handleBiography}
              />
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
)(EditProfileScreen);
