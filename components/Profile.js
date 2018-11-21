import React, { Component } from "react";
import { Card, Icon } from "react-native-elements";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button
} from "react-native";
import { connect } from "react-redux";

import Separator from "../components/Separator";
import { DOMAIN } from "../config/url";
import { createMatch } from "../actions/matches.actions";

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
    borderColor: "#01C89E",
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

class Profile extends Component {
  state = {
    image: this.props.profile_pic_URL,
    text: ""
  };

  handleMatch = () => {
    this.props.createMatch(this.props.user_id);
  };

  renderHeader = () => {
    const { first_name, last_name, user_id, zipcode, canMatch, preview, profile_pic_URL } = this.props;
    const name = `${first_name} ${last_name}`;


    let image = '';
    if (preview) {
      image += profile_pic_URL;
    } else {
      image +=
      process.env.NODE_ENV === "development" && !fromLinkedin
        ? `http://${DOMAIN}/user/${user_id}/profilepic`
        : this.state.image;
        const fromLinkedin = this.state.image.includes("licdn");
        if (!fromLinkedin) {
          image += `?${encodeURI(uuidv1())}`;
        }
    }


    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri:
              "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png"
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
                <Text style={styles.userCityText}>{zipcode}</Text>
              </View>
            </View>
            {canMatch && (
              <View style={styles.uploadBtnContainer}>
                <Button
                  onPress={this.handleMatch}
                  style={styles.uploadBtn}
                  title="Match"
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderBio = () => {
    const { biography, profession, skills } = this.props;
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.userTitleText}>About Me</Text>
        </View>
        <Text style={styles.userBioText}>{biography}</Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.userTitleText}>Desired Profession</Text>
        </View>
        <Text style={styles.userBioText}>{profession}</Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.userTitleText}>Desired Skills</Text>
        </View>
        <Text style={styles.userBioText}>{skills}</Text>
      </View>
    );
  };

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

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {
    createMatch
  }
)(Profile);
