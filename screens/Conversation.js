import React, { Component } from "react";
import { Text, View } from "native-base";
import { MessageShort } from "../components/view";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  render() {
    return (
      <View>
        <Text>Conversation</Text>
        {this.state.messages.map((message, i) => {
          return <MessageShort key={i} {...message} />;
        })}
      </View>
    );
  }
}

export default Conversation;
