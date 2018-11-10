import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";

const Message = props => {
  const { navigate } = props.navigation;
  const style = [];
  style.push(styles.message);
  const profileImg =
    "https://cdn.cnn.com/cnnnext/dam/assets/180923222528-tiger-woods-fedex-playoff-exlarge-169.jpg";
  const croppedImg = profileImg + "=s40-c";

  return (
    <TouchableOpacity
      // onPress={() => alert('message')}
      onPress={() => navigate("Conversation")}
      activeOpacity={0.7}
      style={style}
    >
      <View style={styles.topRow}>
        <View style={styles.userCol}>
          <Image
            style={styles.profile}
            source={{
              uri: croppedImg
            }}
          />
          <Text style={styles.user}>{props.fromUser}</Text>
        </View>
        <View style={styles.timeCol}>
          {/* <Text>{props.dateTime}</Text> */}
          <Text style={styles.date}>{"Yesterday"}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.messageText}>{props.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  message: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgb(225,225,225)",
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: 20
  },
  topRow: {
    flexDirection: "row"
  },
  userCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  timeCol: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  user: {
    fontSize: 20,
    marginLeft: 10
  },
  date: {
    color: "rgb(102, 102, 102)"
  },
  messageText: {
    fontSize: 14
  }
});

export default Message;
