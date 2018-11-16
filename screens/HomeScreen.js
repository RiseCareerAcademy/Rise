import React from "react";
import { Button, Text } from "native-base";
import { Platform, ScrollView, StyleSheet, Image, View } from "react-native";
import { AuthSession, ImagePicker, Permissions } from "expo";
import { MonoText } from "../components/StyledText";
import { connect } from 'react-redux';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };

    if (this.props.loggedIn) {
      this.goToMainScreen();
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.loggedIn === false && this.props.loggedIn === true) {
      const { navigate } = this.props.navigation;
      navigate('Profile');
    }
  }

  goToMainScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('Main');
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
    // For more details: https://i.expo.io/versions/latest/sdk/auth-session
    const result = await AuthSession.startAsync({ authUrl });
    const { params: { state: responseState, code } } = result;
    let validState = true;
    if (responseState !== state) {
      validState = false;
    }

    // This only displays the results to the screen
    this.setState({ result, authUrl, validState, responseState, state });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.center}>
            <Image
              source={require("../assets/images/Rise.png")}
              style={{ height: 200, width: 200 }}
            />
          </View>
            <Button full dark onPress={this.handleMentorPress}>
              <Text>Mentor</Text>
            </Button>

          <View>
            <Button full light onPress={() =>
              navigate('Student')
            }>
              <Text style={styles.greyText}>Student</Text>
            </Button>
          </View>
          <View style={styles.center}>
            <Text>
            --- Or ---
            </Text>
          </View>
          <View>
          <Button full dark onPress={() =>
            navigate('SignIn')
          }>
            <Text>SIGN IN</Text>
          </Button>
          {this.state.validi !== undefined ? (
          <Text>{JSON.stringify(this.state.validState) + '\nRequestState: ' + this.state.state + '\nResponseState: ' + this.state.responseState}</Text>
          ) : null}
          {this.state.authUrl ? (
          <Text>{JSON.stringify(this.state.authUrl)}</Text>
          ) : null}
          {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
          ) : null}
        </View>
        </ScrollView>
      </View>
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

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps, {})(HomeScreen);
