import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Message } from "../components/view";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivityIndicator: true,
      messages: []
    };
  }

  render() {
    const messages = [
      {
        toUser: "Ryan2",
        fromUser: "Dan",
        message: "Turbo is Awesome",
        dateTime: "2018-10-29T03:19:50.594Z"
      },
      {
        toUser: "Ryan3",
        fromUser: "Dan",
        message: "Turbo is Awesome",
        dateTime: "2018-10-29T03:19:50.594Z"
      },
      {
        toUser: "Ryan4",
        fromUser: "Dan",
        message: "Turbo is Awesome",
        dateTime: "2018-10-29T03:19:50.594Z"
      },
      {
        toUser: "Ryan5",
        fromUser: "Dan",
        message: "Turbo is Awesome",
        dateTime: "2018-10-29T03:19:50.594Z"
      }
    ];

    return (
      <View style={styles.container}>
        {this.state.showActivityIndicator ? (
          <ActivityIndicator animating size="large" />
        ) : null}
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
