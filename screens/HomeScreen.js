import React from "react";
import { Button, Text } from "native-base";
import { ScrollView, StyleSheet, Image, View } from "react-native";

import { connect } from 'react-redux';

import { registerWithLinkedin, login } from '../actions/user.actions';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };

    if (this.props.loggedIn) {
      this.goToMainScreen();
    }
  }

  goToMainScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('Main');
  }

  handleMentorPress = async () => {
    this.props.registerWithLinkedin();
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
          {this.state.validState !== undefined ? (
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
    backgroundColor: "#fff",
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
});

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps, {
  registerWithLinkedin,
  login,
})(HomeScreen);
