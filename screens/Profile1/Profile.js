import React, { Component } from "react";
import { Card, Icon, SearchBar } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";

import mainColor from "./constants";

import Email from "./Email";
import Separator from "./Separator";
import Tel from "./Tel";

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
  }
});

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      telDS: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.props.tels),
      emailDS: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.props.emails),
      image: null,
      text: ''
    };
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
        aspect: [4, 3] //Aspect ratio to maintain if user allowed to edit image
      });
      console.log(result); //check output
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }
  };

  onPressPlace = () => {
    console.log("place");
  };

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log("Error:", err));
  };

  onPressSms = () => {
    console.log("sms");
  };

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log("Error:", err)
    );
  };



  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      address: { city, country },
      navigation: { navigate },
    } = this.props;
    
    let { image } = this.state;

    return (
      <View style={styles.headerContainer}>
        <SearchBar
          showLoading
          platform="ios"
          cancelButtonTitle="Cancel"
          placeholder="Search"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={() => navigate("Search", {text:this.state.text})}
        />
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
                uri: image ? image : avatar
              }}
            />

            <View style={styles.uploadBtnContainer}>
              <Button
                onPress={this.handleImagePickerPress}
                style={styles.uploadBtn}
                title="Select image from Camera Roll"
              />
            </View>
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
      <View style={styles.userBioRow}>
        <Text style={styles.userTitleText}>About Me</Text>
        <Text style={styles.userBioText}>{bio}</Text>
        <Text style={styles.userTitleText}>Desired Profession</Text>
        <Text style={styles.userBioText}>{desiredProfession}</Text>
        <Text style={styles.userTitleText}>Desired Skills</Text>
        <Text style={styles.userBioText}>{desiredSkills}</Text>
      </View>
    );
  };

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
  );

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

export default Contact;
