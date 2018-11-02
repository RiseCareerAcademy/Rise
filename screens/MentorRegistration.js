import React from "react";
import { Button, Text } from "native-base";
import { StyleSheet, View } from "react-native";

export default class MentorRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View>
        <Text>You have been authorized by Linkedin</Text>
        <Button full light onPress={() =>
          navigate('Main')
        }>
          <Text style={styles.greyText}>Student</Text>
        </Button>
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
  }
});
