import React, { Component } from "react";
import { ScrollView, StyleSheet, View,  Text, Image } from "react-native";
import { List, ListItem } from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import Expo from "expo";


export default class SearchScreen extends Component {
  state = {
    //array of matches with respective scores
    results: [],
    checkedSkills:true,
    checkedProfessions:true,
    checkedMentors:true,
    checkedMentees:true,
    checkedNames:true,
    data: []
  };

  constructor(props) {
    super(props);
    
    //TODO: API call function 
    //WILL THROW TYPEERROR ON THIS SYSTEM

    const { manifest } = Expo.Constants;
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;

    fetch('http://'+api+'/user/mentors',{
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("IT WORKED");

    })
    .catch((error) => {
      console.log("error isss: " + error);
    });
  }

  //search function
  search = () => {

    const { navigation } = this.props;
    var searchInput = navigation.getParam('text').toString();
    searchInput = searchInput.toLowerCase();
    
    var results = [];
    var scores = [];
    var currArray = '';
    var tempPostman = ''; 
    
    if (this.state.checkedSkills)
    {
      tempPostman = "21542330576964,11542331557063,11542339784414";
      currArray = tempPostman.split(',');

      //for each ID with skill, add to results
      for (var i = 0; i < currArray.length; i++){
        if (results.indexOf(currArray[i]) > -1){
          //if id exists in results already
          scores[results.indexOf(currArray[i])] += 1;
        }else{
          results[results.length] = currArray[i];
          scores[scores.length] = 1;
        }
      }
    }
    
    //BY PROFESSIONS
    if (this.state.checkedProfessions)
    {
      tempPostman = "21542330576964"
      currArray = tempPostman.split(',');
      //for each ID with skill, add to results
      for (i = 0; i < currArray.length; i++){
        if (results.indexOf(currArray[i]) > -1){
          //if id exists in results already
          scores[results.indexOf(currArray[i])] += 3;
        }else{
          results[results.length] = currArray[i];
          scores[scores.length] = 3;
        }
      }
    }

    //BY NAMES
    if (this.state.checkedNames)
    {
      tempPostman = "21542330576964"
      currArray = tempPostman.split(',');
      //for each ID with skill, add to results
      for (i = 0; i < currArray.length; i++){
        if (results.indexOf(currArray[i]) > -1){
          //if id exists in results already
          scores[results.indexOf(currArray[i])] += 2;
        }else{
          results[results.length] = currArray[i];
          scores[scores.length] = 2;
        }
      }
    }

    var finalResults = [];
    var finalScores = [];

    //BY MENTOR/MENTEE
    if (this.state.checkedMentors)
    {
      for(i = 0; i < results.length; i++){
        if(results[i].charAt(0)=='1')
        {
          finalResults[finalResults.length] = results[i];
          finalScores[finalScores.length] = scores[i];
        }
      }
    }
    if (this.state.checkedMentees){
      for(i = 0; i < results.length; i++){
        if(results[i].charAt(0)=='2')
        {
          finalResults[finalResults.length] = results[i];
          finalScores[finalScores.length] = scores[i];
        }
      }
    }

    //sort by score
    for (let i = 1; i < finalScores.length; i++) {
      for (let j = 0; j < i; j++) {
        if (finalScores[i] > finalScores[j]) {
          let x = finalScores[i];
          finalScores[i] = finalScores[j];
          finalScores[j] = x;
          let y = finalResults[i];
          finalResults[i] = finalResults[j];
          finalResults[j] = y;
        }
      }
    }


    for(i = 0; i < finalResults.length;i++)
    {console.log(finalResults[i].toString());}
    
    this.state.results = finalResults;

    return;
  }

  makeListData = (results) => {
    this.state.data=[{"name": "Margie Hadjiev","skills":"Sleeping","profession":"god"},
    {"name": "Margie Chan","skills":"CCAC","profession":"buddha"}];

  }

  
  render() {

    this.search();

    return (
      <View style={styles.container}>
      <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
      <CheckBox title='Skills' checked={this.state.checkedSkills}
      onPress={() => this.setState({checkedSkills: !this.state.checkedSkills})}
      />
      <CheckBox title='Professions' checked={this.state.checkedProfessions}
      onPress={() => this.setState({checkedProfessions: !this.state.checkedProfessions})}/>
      
      <CheckBox title='Mentors' checked={this.state.checkedMentors}
      onPress={() => this.setState({checkedMentors: !this.state.checkedMentors})}/>
      
      <CheckBox title='Mentees' checked={this.state.checkedMentees}
      onPress={() => this.setState({checkedMentees: !this.state.checkedMentees})}/>  
    
    <List>
          <ListItem
          roundAvatar
          title='Margie Hadjiev'
          subtitle={
            <View style={styles.subtitleView}>
              <Text style={styles.ratingText}>Sleeping, Smiling</Text>
              <Text style={styles.ratingText}>Mechanical Engineer</Text>
            </View>
          }
          //avatar={require('./avatar.jpg')}
        />
        <ListItem
          roundAvatar
          title='Margie Hadjiev'
          subtitle={
            <View style={styles.subtitleView}>
              <Text style={styles.ratingText}>Mechanical Engineer</Text>
              <Text style={styles.ratingText}>Sleeping, Smiling</Text>
            </View>
          }
          //avatar={require('./avatar.jpg')}
        />
    </List>
    
    </ScrollView>
    
    </View>


    );
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonStyle: {
    margin: 10
  },
  greyText: {
    color: "grey"
  },
  contentContainer: {
    paddingTop: 30
  },

  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
  

});
