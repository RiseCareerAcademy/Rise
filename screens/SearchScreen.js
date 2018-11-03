import React, { Component } from "react";
import { ScrollView, StyleSheet, View, SectionList, Text } from "react-native";

export default class SearchScreen extends Component {
  state = {
    tempSearch: 'Kevin', //temp
    //array of matches with respective scores
    matches: [],
    scores: []
  };

  constructor(props) {
    super(props);

    //fakeData organized by iterations of (name, profession, skills);
    const fakeData = [
      ["Daniel Ng"],
      ["Software Developer"],
      ["JQuery", "Python", "UX"], //should be number 4
      ["Tracy Lewis"],
      [""],
      ["UX", "Prototyping"], //should be number 3
      ["Kevin Mui"],
      ["Product Manager"],
      [""], //should be number 2
      ["Lewis Tracy"],
      ["Product Manager"],
      ["UX"], //should be number 1
      ["Tone Yu"],
      ["Nurse"],
      ["Birthing", "Yelling", "Running"] //should not be in the results
    ];

    const { tempSearch } = this.state;
    const { scores, matches } = this.search(tempSearch, fakeData);

    this.state.scores = scores;
    this.state.matches = matches;
  }

  //search function
  search = (tempSearch, fakeData) => {
    matches = [];
    scores = [];

    console.log(fakeData[2].toString().split());


      for (let j = 0; j < fakeData.length; j += 3) {
        var parsedData = fakeData[j+2].toString().split(' ');
        for(let k = 0; k < parsedData.length; k++){
          if (parsedData[k].indexOf(tempSearch) > -1) {
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
        if (fakeData[j+2].indexOf(tempSearch) > -1) {
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
          if (parsedData[k].indexOf(tempSearch) > -1) {
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
        if (fakeData[j+1].indexOf(tempSearch) > -1) {
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
          if (parsedData[k].indexOf(tempSearch) > -1) {
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
        if (fakeData[j].indexOf(tempSearch) > -1) {
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
              keyExtractor={(item, index) => index}
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
