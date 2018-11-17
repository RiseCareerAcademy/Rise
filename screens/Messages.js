import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TextInput, Keyboard, Button } from 'react-native';
import { Message } from "../components/view";
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'

const uuidv1 = require('uuid/v1');

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivityIndicator: true,
      searchBarFocused: false,
      messages: [],
      matches: [],
      text: '',
      lastChecked: '',
      allMessages: []
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
          var otherUser = curr_row.to_id
          if (otherUser == "333") {
            otherUser = curr_row.from_id
          }
  
          recieved.push({fromUser: curr_row.from_id, toUser: curr_row.to_id, message: curr_row.message_body, dateTime: curr_row.timestamp, match: curr_row.match_id, otherUser: otherUser})
        }
        console.log("SETTING STATE TO BE")
        console.log (recieved)
        this.setState({messages: recieved})
        this.setState({allMessages: recieved})
        this.setState({showActivityIndicator: false})
        console.log("state is now")
        console.log(this.state.messages)
        return recieved
      })
      .catch((error) => {
        console.log("error is: " + error);
      });
  }
  
  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardDidShow = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    console.log("comoponent" + this.state.text)
  }

  // for android
  keyboardDidShow = () => {
    this.setState({searchBarFocused: true})
  }

  // for ios
  keyboardWillShow = () => {
    this.setState({searchBarFocused: true})
  }

  keyboardWillHide = () => {
    this.setState({searchBarFocused: false})
  }

  onPressButton() {
    // Put message in database
    console.log("pressed")
    console.log(this.state.text)

    this.setState({text: ""})
    // clear text input
    Keyboard.dismiss()

    //Alert.alert('You tapped the button!')
  }

  filterMessages() {
    if (this.state.lastChecked != this.state.text) {
      this.setState({lastChecked: this.state.text})
      console.log("hello: " + this.state.text)
      text = this.state.text
      var array = []
      for (var i = 0; i < this.state.allMessages.length; i++) {
        other = String(this.state.allMessages[i].otherUser)
        console.log(typeof other)
        if (other.includes(text)) {
          array.push(this.state.allMessages[i])
        }
      }
      console.log("array" + array)
      if (array.length > 0) {
          this.setState({messages: array})
        //  console.log(this.state.messages)
      }
    } 
  }

  render() {

    return (
      
      <View style={styles.container}>
        {this.state.showActivityIndicator ? (
          <ActivityIndicator animating size="large" />
        ) : null}
        <View style = {{flexDirection:'row', height: 45, backgroundColor: 'white', justifyContent:'flex-end', padding: 5}}>
          <Animatable.View animation="slideInRight" duration={500}style={{flex: 6, width: window.width, height: 35, borderRadius: 7, backgroundColor: 'rgba(0,0,0,0.1)', flexDirection: 'row', padding: 5, alignItems: 'center'}}>
              <Animatable.View animation={this.state.searchBarFocused? "fadeInLeft" : "fadeInRight"}>
                <Icon name={this.state.searchBarFocused ? "md-arrow-back" : "ios-search"} duration={100} style={{fontSize: 20, color: 'rgba(0,0,0,0.3)'}}/>
              </Animatable.View>
            <TextInput placeholder="Search" onChangeText={(text) => this.setState({text})} value={this.state.text} style={{fontSize: 20, marginLeft: 15, flex: 1}}/>
          </Animatable.View>
          <View style={{flex: this.state.searchBarFocused ? 1.5 : 1}}>
          <Button
                onPress={() => this.onPressButton()}
                title={this.state.searchBarFocused ? "cancel" : "clear"}
                color="rgb(135,206,250)"
              />
          </View>
        </View>
        <FlatList
          style={{backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)':'rgb(243, 243, 243)'}}
          data={this.state.messages}
          keyExtractor = {(item, index) => index.toString()}
          //keyExtractor={item => item.id}
          renderItem={({ item }, i) => (
            <Message {...item} key = {uuidv1()} navigation={this.props.navigation} back = {this.state.searchBarFocused ? 'rgba(0,0,0,0.005)' : 'white'}/>
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
