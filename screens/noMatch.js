import React from "react";
import { Text } from "native-base";
import { StyleSheet, View, Image } from "react-native";

export default class noMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null
    };
  }

  render() {
    return (
        <View style={styles.container}>
        <View style={styles.center}>
        <Image
          source={require("../assets/images/Rise.png")}
          style={{ height: 200, width: 200 }}
        />
        </View>
        <View style={styles.center}>
        <Text>No matches were found, we'll notify you once we find one!</Text>
        </View>
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
