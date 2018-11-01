import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert} from 'react-native';
export default class App extends Component {
    state ={
        mentors:[[]]
    }
handlePress = async () => {
  fetch('http://192.168.0.104:8000/user/mentor', {
      method: 'GET'
})
    .then((response) => response.json())
    .then((responseJson) => {
        //TO DO: add mentors name and skills in array
 console.log(responseJson.rows[0].first_name + "'s skills are  " + responseJson.rows[0].skills);
    })
    .catch((error) => {
      console.log("error is: " + error);
    });
}
  render(){
  return(
   <View style={{paddingTop: 50, paddingLeft: 50 }}>
   <Text> Some other text </Text>
    <Text> Some other text </Text>
    <TouchableOpacity onPress={this.handlePress.bind(this)}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click me to see the name </Text>
    </TouchableOpacity>
</View> 
  );
}
}