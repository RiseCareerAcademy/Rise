import React from "react";
import { Button, Text } from "native-base";
import { Platform, ScrollView, StyleSheet, Image, View } from "react-native";
import { AuthSession } from "expo";

import { MonoText } from "../components/StyledText";

export default class MentorRegistration extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      result: null,
    };
  }

  handleMentorPress = async () => {
    // Setup params for Linkedin API
    // For more details: https://developer.linkedin.com/docs/oauth2
    const response_type = 'code';
    const client_id = '7872jtsnbo9n7s';
    const redirectUrl = AuthSession.getRedirectUrl();
    const state =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const authUrl = 
    `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}` +
    `&client_id=${encodeURIComponent(client_id)}` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    `&state=${encodeURIComponent(state)}`;

    // Use Expo's AuthSession to connect with the Linkedin API
    // For more details: https://docs.expo.io/versions/latest/sdk/auth-session 
    const result = await AuthSession.startAsync({ authUrl });
    const { params: { state: responseState, code } } = result;
    let validState = true;
    if (responseState !== state) {
      validState = false;
    }

    // This only displays the results to the screen
    this.setState({ result, authUrl, validState, responseState, state });
  };

  render() {
    return (
        <Button full dark onPress={this.handleMentorPress}>
          <Text>Linkedin Connect</Text>
        </Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
