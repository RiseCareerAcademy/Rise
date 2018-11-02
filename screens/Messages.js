import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Message } from "../components/view";

export default class Messages extends Component {
  static navigationOptions = {
    title: 'Messages',
  };

  constructor(props) {
    super(props);
    this.state = {
      showActivityIndicator: true,
      messages: [],
      name: "Paul"
    };
  }

  render() {
    const messages = [
      {
        toUser: "Paul",
        fromUser: "Rita",
        message: "Hey what's up hello",
        dateTime: "2018-10-29T03:19:50.594Z"
      },
      {
        toUser: "Paul",
        fromUser: "Daniel",
        message: "More content.",
        dateTime: "2018-10-29T03:19:50.594Z"
      },
      {
        toUser: "Paul",
        fromUser: "Kevin",
        message: "Here is some more conent",
        dateTime: "2018-10-29T03:19:50.594Z"
      },
      {
        toUser: "Paul",
        fromUser: "Yank",
        message: "Our group loves Kwik Trip",
        dateTime: "2018-10-29T03:19:50.594Z"
      }
    ];

    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }, i) => (
            <Message {...item} key = {i} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    width: 100 + "%",
    height: 100 + "%",
    display: "flex",
    backgroundColor: "rgb(243, 243, 243)",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
};
