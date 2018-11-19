import React, { Component } from "react";
import { Card, Icon, SearchBar } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import {
  Image,
  ImageBackground,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  AlertIOS
} from "react-native";
import { connect } from "react-redux";

import mainColor from "./constants";

import Email from "./Email";
import Separator from "./Separator";
import Tel from "./Tel";
import { DOMAIN } from "../../config/url";
import { uploadProfilePic, login } from "../../actions/user.actions";

const uuidv1 = require("uuid/v1");

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0
  },
  container: {
    flex: 1
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1
      },
      android: {
        alignItems: "center"
      }
    })
  },
  placeIcon: {
    color: "white",
    fontSize: 26
  },
  scroll: {
    backgroundColor: "#FFF"
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row"
  },
  userCityRow: {
    backgroundColor: "transparent"
  },
  userCityText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center"
  },
  userBioText: {
    paddingLeft: 15,
    color: "#000000",
    fontSize: 15,
    fontWeight: "300"
  },
  userTitleText: {
    paddingLeft: 15,
    paddingTop: 15,
    color: "#000000",
    fontSize: 15,
    fontWeight: "600"
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center"
  },
  uploadBtnContainer: {
    margin: "auto"
  },
  uploadBtn: {
    margin: "auto"
  },
  editBtn: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 200,
    height: 100,
    marginHorizontal: 300,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});

class Contact extends Component {
  constructor(props) {
    super(props);
    const { manifest } = Expo.Constants;
    global.api =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:8000`)
        : `api.example.com`;

    this.state = {
      telDS: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.props.tels),
      emailDS: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.props.emails),
      image:
        process.env.NODE_ENV === "development"
          ? `http://${DOMAIN}/user/${this.props.user_id}/profilepic`
          : this.props.profile_pic_URL,
      image: this.props.profile_pic_URL,
      text: ""
    };
  }

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      // name,
      address: { city, country },
      navigation: { navigate }
    } = this.props;

    // let { image } = this.state;
    const { first_name, last_name, user_id } = this.props;
    const name = `${first_name} ${last_name}`;

    const fromLinkedin = this.state.image.includes("licdn");

    let image =
      process.env.NODE_ENV === "development" && !fromLinkedin
        ? `http://${DOMAIN}/user/${user_id}/profilepic`
        : this.state.image;
    if (!fromLinkedin) {
      image += `?${encodeURI(uuidv1())}`;
    }

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: avatarBackground
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: image
              }}
            />

            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {country}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderBio = () => {
    const { bio, desiredProfession, desiredSkills } = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.userTitleText}>About Me</Text>
        </View>
        <Text style={styles.userBioText}>{this.props.biography}</Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.userTitleText}>Desired Profession</Text>
        </View>
        <Text style={styles.userBioText}>{this.props.profession}</Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.userTitleText}>Desired Skills</Text>
        </View>
        <Text style={styles.userBioText}>{this.props.skills}</Text>
      </ScrollView>
    );
  };

  /*
  renderTel = () => (
    <ListView
      contentContainerStyle={styles.telContainer}
      dataSource={this.state.telDS}
      renderRow={({ id, name, number }, _, k) => {
        return (
          <Tel
            key={`tel-${id}`}
            index={k}
            name={name}
            number={number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        );
      }}
    />
  );

  renderEmail = () => (
    <ListView
      contentContainerStyle={styles.emailContainer}
      dataSource={this.state.emailDS}
      renderRow={({ email, id, name }, _, k) => {
        return (
          <Email
            key={`email-${id}`}
            index={k}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        );
      }}
    />
  );*/

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderBio()}
            {Separator()}
          </Card>
        </View>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => ({
  ...state.user,
  profile_pic_URL: state.user.image || state.user.profile_pic_URL
});

export default connect(
  mapStateToProps,
  { uploadProfilePic, login }
)(Contact);
