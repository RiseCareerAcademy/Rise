import React, { Component } from "react";
import { ScrollView, StyleSheet, View, SectionList, Text } from "react-native";

export default class MatchesScreen extends Component {
  state = {
    desiredSkills: ["Agile Methodologies", "UX", "Prototyping"], //temp
    desiredProfessions: ["Product Manager"], //temp
    //array of matches with respective scores
    matches: [],
    scores: [],
    mentorsFromServer:[]
  };

  constructor(props) {
    super(props);
    var mentors = [];
    //populate array with data from database

    
    //replace 10.141.17.61 with your own ip address
    fetch('http://10.141.17.61:8000/user/mentor', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //TO DO: add mentors name and skills in array
        
        for (var i = 0; i < responseJson.rows.length; i++){
            var curr_row = responseJson.rows[i];
            mentors.push([curr_row.first_name])
            mentors.push([curr_row.occupation])
            mentors.push( curr_row.skills);
       }
      console.log(mentors.join('\n'))
      const { desiredSkills, desiredProfessions } = this.state;
      const { scores, matches } = this.match(desiredSkills, desiredProfessions, mentors);
      this.setState({scores: scores});
      this.setState({matches: matches});
    })
    .catch((error) => {
      console.log("error is: " + error);
    });
  }

  //match function
  match = (desiredSkills, desiredProfessions, fakeData) => {
    const matches = [];
    const scores = [];

    for (let i = 0; i < desiredSkills.length; i++) {
      for (let j = 0; j < fakeData.length; j += 3) {
        if (fakeData[j + 2].indexOf(desiredSkills[i]) > -1) {
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
    }

    for (let i = 0; i < desiredProfessions.length; i++) {
      for (let j = 0; j < fakeData.length; j += 3)
        if (fakeData[j + 1].indexOf(desiredProfessions[i]) > -1) {
          if (matches.indexOf(fakeData[j]) > -1)
            //if matching skill, add to match list, score ++
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 3;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 3;
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
                { title: "Suggested Matches", data: matches },
                { title: "Scores of Matches(temp)", data: scores }
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
