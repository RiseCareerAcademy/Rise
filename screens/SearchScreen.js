import React, { Component } from "react";
import { ScrollView, StyleSheet, View, SectionList, Text } from "react-native";

export default class SearchScreen extends Component {
  state = {
    //array of matches with respective scores
    matches: [],
    scores: []
  };

  constructor(props) {
    super(props);
    
   var mentors = [];
    //populate array with data from database

    const { manifest } = Expo.Constants;
  const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `api.example.com`;
    console.log(api);
    fetch('http://'+api+'/user/mentor', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        for (var i = 0; i < responseJson.rows.length; i++){
            var curr_row = responseJson.rows[i];
            mentors.push([curr_row.first_name])
            mentors.push([curr_row.occupation])
            mentors.push( curr_row.skills);
       }
      const { scores, matches } = this.search(mentors);
      this.setState({scores: scores});
      this.setState({matches: matches});
    })
    .catch((error) => {
      console.log("error is: " + error);
    });
  }

  //search function
  search = (fakeData) => {
    const { navigation } = this.props;
    searchInput = navigation.getParam('text');
    matches = [];
    scores = [];
    if (searchInput.length == 0 || fakeData.length == 0){
      return {scores,matches}
    }
    
      for (let j = 0; j < fakeData.length; j += 3) {
        var parsedData = fakeData[j+2].toString().split(' ');
        for(let k = 0; k < parsedData.length; k++){
          if (parsedData[k].indexOf(searchInput) > -1) {
            //if matching skill, add to match list, score ++
            if (matches.indexOf(fakeData[j]) > -1)
              //if already has points
              scores[matches.indexOf(fakeData[j])] += 1;
            else {
              //else add to list of matches with new score
              matches[matches.length] = fakeData[j];
              scores[scores.length] = 1;
            }
          }
        }
        if (fakeData[j+2].indexOf(searchInput) > -1) {
          //if matching skill, add to match list, score ++
          if (matches.indexOf(fakeData[j]) > -1)
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 1;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 1;
          }
        }
      }
    
      for (let j = 0; j < fakeData.length; j += 3){
        var parsedData = fakeData[j+1].toString().split(' ');
        for(let k = 0; k < parsedData.length; k++){
          if (parsedData[k].indexOf(searchInput) > -1) {
            if (matches.indexOf(fakeData[j]) > -1)
              //if matching skill, add to match list, score ++
              //if already has points
              scores[matches.indexOf(fakeData[j])] += 2;
            else {
              //else add to list of matches with new score
              matches[matches.length] = fakeData[j];
              scores[scores.length] = 3;
            }
          }
        }
        if (fakeData[j+1].indexOf(searchInput) > -1) {
          //if matching skill, add to match list, score ++
          if (matches.indexOf(fakeData[j]) > -1)
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 2;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 2;
          }
        }
      }
    
      for (let j = 0; j < fakeData.length; j += 3){
        var parsedData = fakeData[j].toString().split(' ');
        for(let k = 0; k < parsedData.length; k++){
          if (parsedData[k].indexOf(searchInput) > -1) {
            if (matches.indexOf(fakeData[j]) > -1)
              //if matching skill, add to match list, score ++
              //if already has points
              scores[matches.indexOf(fakeData[j])] += 2;
            else {
              //else add to list of matches with new score
              matches[matches.length] = fakeData[j];
              scores[scores.length] = 2;
            }
          }
        }
        if (fakeData[j].indexOf(searchInput) > -1) {
          //if matching skill, add to match list, score ++
          if (matches.indexOf(fakeData[j]) > -1)
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 2;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 2;
          }
        }
      }
      

    //sort by score
    for (let i = 1; i < scores.length; i++) {
      for (let j = 0; j < i; j++) {
        if (scores[i] > scores[j]) {
          let x = scores[i];
          scores[i] = scores[j];
          scores[j] = x;
          let y = matches[i];
          matches[i] = matches[j];
          matches[j] = y;
        }
      }
    }

    return { scores, matches };
  }

  render() {

    const { matches, scores } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <SectionList
              sections={[
                { title: "Search Results", data: matches },
                { title: "Scores", data: scores }
              ]}
              renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
              renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
              keyExtractor={(index) => index}
            />
          </View>
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
  }
});
