import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Message } from "../components/view";

const uuidv1 = require('uuid/v1');

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivityIndicator: true,
      messages: []
    };

    var recieved = [];

    const { manifest } = Expo.Constants;
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    console.log(api);
    fetch('http://' + api + '/message/', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //TO DO: add mentors name and skills in array
        console.log(responseJson)

        for (var i = 0; i < responseJson.rows.length; i++) {
          var curr_row = responseJson.rows[i];
          recieved.push({fromUser: curr_row.from_id, toUser: curr_row.to_id, message: curr_row.message_body, dateTime: curr_row.timestamp, match: curr_row.match_id})
         // console.log(curr_row.skills.split(','))
        }

        console.log (recieved)
        this.setState({messages: recieved})
        this.setState({showActivityIndicator: false})

      })
      .catch((error) => {
        console.log("error is: " + error);
      });
  }

  render() {
    //const messages = [
    //   {
    //     toUser: "Ryan2",
    //     fromUser: "Dan",
    //     message: "Turbo is Awesome",
    //     dateTime: "2018-10-29T03:19:50.594Z"
    //   },
    //   {
    //     toUser: "Ryan3",
    //     fromUser: "Dan",
    //     message: "Turbo is Awesome",
    //     dateTime: "2018-10-29T03:19:50.594Z"
    //   },
    //   {
    //     toUser: "Ryan4",
    //     fromUser: "Dan",
    //     message: "Turbo is Awesome",
    //     dateTime: "2018-10-29T03:19:50.594Z"
    //   },
    //   {
    //     toUser: "Ryan5",
    //     fromUser: "Dan",
    //     message: "Turbo is Awesome",
    //     dateTime: "2018-10-29T03:19:50.594Z"
    //   }
    // ];

    return (
      
      <View style={styles.container}>
        {this.state.showActivityIndicator ? (
          <ActivityIndicator animating size="large" />
        ) : null}
        <FlatList
          data={this.state.messages}
          keyExtractor={item => item.id}
          renderItem={({ item }, i) => (
            <Message {...item} key = {uuidv1()} navigation={this.props.navigation} />
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
