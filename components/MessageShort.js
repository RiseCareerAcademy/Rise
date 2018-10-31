import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

const Message = props => {
  const style = [];
  style.push(styles.message);
  var profileImg = "https://cdn.cnn.com/cnnnext/dam/assets/180923222528-tiger-woods-fedex-playoff-exlarge-169.jpg";
  var croppedImg = profileImg + "=s40-c";
  var pad = {paddingHorizontal : 30}


  var dir = !props.sentMessage
    ? { flexDirection: "row-reverse" }
    : { flexDirection: "row" };

  if (props.fromUser ==  "Me") {
    dir = {flexDirection: "row"};
    profileImg = "https://tmssl.akamaized.net//images/portrait/header/94529-1454599346.jpg?lm=1454599357"
    croppedImg = profileImg + "=s40-c";
    pad = {paddingHorizontal : -30}

  }


  const containerStyle = [styles.container];
  containerStyle.push(dir);
  containerStyle.push(pad);

  

  return (
    <View style={containerStyle}>
      {" "}
      <View style={styles.userCol}>
        <Image
          style={styles.profile}
          source={{
            uri: croppedImg
          }}
        />
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>{props.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    paddingHorizontal: 30,
    marginHorizontal: 15,
    marginTop: 15
  },
  message: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgb(225,225,225)",
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10
  },
  userCol: {
    flexDirection: "row"
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 20
  },
  messageText: {
    fontSize: 14
  }
});

export default Message;
