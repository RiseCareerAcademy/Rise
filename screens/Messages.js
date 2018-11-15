import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Message } from "../components/view";

const uuidv1 = require('uuid/v1');

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivityIndicator: true,
      messages: [],
      matches: []
    };
    this.loadMatches();
  }

  loadMatches() {
    console.log("in matches")

    var list = [];

    const { manifest } = Expo.Constants;
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    console.log(api);
    // TODO: change to actual userid
    fetch('http://' + api + '/match/userid/333', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //TO DO: add mentors name and skills in array
        console.log(responseJson)

        for (var i = 0; i < responseJson.rows.length; i++) {
          var curr_row = responseJson.rows[i];
  
          list.push({matchId: curr_row.match_id, matchName: curr_row.mentor_id, curruser: curr_row.mentee_id})
         // console.log(curr_row.skills.split(','))
        }

        console.log (list)
        this.setState({matches: list})

        var recieved = [];
        for(var i = 0; i < list.length; i++) {
          var matchNum = list[i].matchId;
          console.log("another one " + list[i].matchId)
          // call first message
          recieved = this.loadMessages(matchNum)
        }

        this.setState({showActivityIndicator: false})



      })
      .catch((error) => {
        console.log("error is: " + error);
      });

  }

  loadMessages(matchid) {
    var recieved = this.state.messages;

    const { manifest } = Expo.Constants;
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    console.log(api);
    fetch('http://' + api + '/message/' + matchid, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //TO DO: add mentors name and skills in array
        console.log(responseJson)

        for (var i = 0; i < responseJson.rows.length; i++) {
          var curr_row = responseJson.rows[i];
  
          recieved.push({fromUser: curr_row.from_id, toUser: curr_row.to_id, message: curr_row.message_body, dateTime: curr_row.timestamp, match: curr_row.match_id})
        }
        console.log("SETTING STATE TO BE")
        console.log (recieved)
        this.setState({messages: recieved})
        this.setState({showActivityIndicator: false})
        console.log("state is now")
        console.log(this.state.messages)
        return recieved
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
