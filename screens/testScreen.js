import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert} from 'react-native';
export default class App extends Component {
    
handlePress = async () => {
  fetch('http://192.168.0.104:8000/user/mentor', {
      method: 'GET'
})
    .then((response) => response.json())
    .then((responseJson) => {
        //TO DO: add mentors name and skills in array
        var mentors = [];
        for (var i = 0; i < responseJson.rows.length; i++){
            var curr_row = responseJson.rows[i];
            mentors.push([curr_row.first_name],[curr_row.skills]);
       }
 console.log(responseJson.rows[0].first_name + "'s skills are  " + responseJson.rows[0].skills);
 console.log(responseJson.rows.length);
 console.log(mentors.toString())
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