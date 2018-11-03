import React, { Component } from "react";
import { Button, Text, View, Container, Header, Content, Form, Item, Label, Input  } from "native-base";
import {  StyleSheet} from "react-native";
import { MessageShort } from "../components/view";

class Conversation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: this.props.navigation.state.params.name
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
  });


  render() {
    this.state.messages = [{"toUser":"Ryan2","fromUser":"Dan","message":"Varun is really nice.","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan3","fromUser":"Me","message":"I think we'll get an A","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan4","fromUser":"Rita","message":"The Milwaukee Bucks are undefeated through seven games, making them the only remaining unbeaten team in the NBA. Malcolm Brogdon, a former rookie of the year and a key part of the team's starting unit, is hitting his stride as one of the team's many dynamic, play- and shot-making options. Everything's going well in Milwaukee for the hometown team, which will look to continue its winning ways against the Boston Celtics at 7 p.m. Thursday at TD Garden.","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan5","fromUser":"Kevin","message":"That's pretty cooool","dateTime":"2018-10-29T03:19:50.594Z"}]
       
    console.log("name" + this.state.name)

    return (
      <View>
        {this.state.messages.map((message, i) => {
          return <MessageShort key={i} {...message} />;
        })}
      <View style={styles.container}>
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(0, 0, 0)"
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


export default Conversation;
