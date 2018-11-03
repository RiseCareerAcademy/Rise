import React, { Component } from "react";
import { View } from "react-native";
import { MessageShort } from "../components/view";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  render() {
    const messages = [{"toUser":"Ryan2","fromUser":"Dan","message":"Varun is really nice.","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan3","fromUser":"Me","message":"I think we'll get an A","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan4","fromUser":"Rita","message":"The Milwaukee Bucks are undefeated through seven games, making them the only remaining unbeaten team in the NBA. Malcolm Brogdon, a former rookie of the year and a key part of the team's starting unit, is hitting his stride as one of the team's many dynamic, play- and shot-making options. Everything's going well in Milwaukee for the hometown team, which will look to continue its winning ways against the Boston Celtics at 7 p.m. Thursday at TD Garden.","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan5","fromUser":"Kevin","message":"That's pretty cooool","dateTime":"2018-10-29T03:19:50.594Z"}]
       

    return (
      <View>
        {messages.map((message, i) => {
          return <MessageShort key={i} {...message} />;
        })}
      </View>
    );
  }
}

export default Conversation;
