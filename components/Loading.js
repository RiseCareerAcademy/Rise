import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";

export class Loading extends React.Component {
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    top: "50%"
  }
});

export default Loading;
