import React, { Component } from "react";
import { Alert, View, Text, TouchableOpacity, TextInput, StyleSheet, Button, ScrollView} from "react-native";
import {Item,Input} from "native-base";
import { MessageShort } from "../components/view";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      matchId: props.navigation.state.params.matchId,
      toUser: props.navigation.state.params.toUser,
      fromUser: props.navigation.state.params.title
    };

    console.log("matchId: " + this.state.matchId)
    this.onPressButton = this.onPressButton.bind(this);
    this.loadMessages()
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  sendMessages() {
        console.log("messages")
        var body = { 
          message_id: Math.floor(Math.random()*(10000)),
          to_id: this.state.toUser, 
          from_id: this.state.fromUser,
          message_body: this.state.text,
          timestamp: "2014-10-07 08:23:19.120",
          match_id: 1000,
        }
        console.log(JSON.stringify(body))
        const { manifest } = Expo.Constants;
        const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
          ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
          : `api.example.com`;
        console.log(api);
        fetch('http://' + api + '/message', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
              this.loadMessages()
              return responseJson.success;
            })
            .catch((error) => {
              console.error(error);
          });
  }

  loadMessages() {
    var recieved = [];

    const { manifest } = Expo.Constants;
        const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
          ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
          : `api.example.com`;
        console.log(api);
        fetch('http://' + api + '/message/all/' + this.state.matchId, {
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
  
        })
        .catch((error) => {
          console.log("error is: " + error);
        });  
  }

  onPressButton() {
    // Put message in database
    console.log("pressed")
    this.sendMessages()

    // clear text input


    //Alert.alert('You tapped the button!')
  }


  render() {

    return (
      <View style={{flex: 1}}>
        <ScrollView ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: false}); }}>>
          {this.state.messages.map((message, i) => {
            return <MessageShort key={i} {...message} />;
          })}
        </ScrollView>
        <View style={{flexDirection:'row', width: window.width, marginBottom: 10, margin: 10, padding:4, alignItems:'center', justifyContent:'flex-end', borderWidth:4, borderColor:'#888', borderRadius:10, backgroundColor:'#FFF'}}>
          <View style={{flex:4}}>
          <TextInput ref={input => { this.textInput = input }} style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Type here"
          placeholderTextColor = "#D3D3D3"
          autoCapitalize = "none"
          backgroundColor = '#F5FCFF'
          onChangeText={(text) => this.setState({text})}/>
          </View>
          <View style={{flex:1}}>
          <Button
                onPress={() => this.onPressButton()}
                title="Send"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
          </View>
        </View>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  input: {
     marginHorizontal: 15,
     marginTop: 0,
     height: 40,
     borderColor: '#000000',
     borderWidth: 1
  }
})
export default Conversation;
