import React, { Component } from "react";
import { ScrollView, StyleSheet, View, SectionList, Text } from "react-native";
import Expo from "expo";

export default class MatchesScreen extends Component {
  state = {
    desiredSkills: ["Agile Methodologies", "UX", "Prototyping"], //temp
    desiredProfessions: ["Product Manager"], //temp
    //array of matches with respective scores
    matches: [],
    scores: [],
    mentorsFromServer: []
  };

  constructor(props) {
    super(props);
    var mentors = [];
    
  
    

    const { manifest } = Expo.Constants;
    global.api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    
    fetch('http://' + global.api + '/user/mentor', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //TO DO: add mentors name and skills in array

        for (var i = 0; i < responseJson.rows.length; i++) {
          var curr_row = responseJson.rows[i];
          //we need to get user id of these mentors but 
          //id is no longer a field
          mentors.push([curr_row.first_name])
          mentors.push([curr_row.occupation])
          mentors.push(curr_row.skills);
          console.log(curr_row.skills.split(','))
        }
        const { desiredSkills, desiredProfessions } = this.state;
        const { scores, matches } = this.match(desiredSkills, desiredProfessions, mentors);
        this.setState({ scores: scores });
        this.setState({ matches: matches });
      })
      .catch((error) => {
        console.log("error is: " + error);
      });
  }

  //add skills to desiredSkills
  addMenteeSkill = (desiredSkills, additionalSkill) => {
    if (desiredSkills.split(",").indexOf(additionalSkill) == -1) {
      desiredSkills = desiredSkills + "," + additionalSkill
    }
  }

  //delete skills from desiredSkills
  deleteMenteeSkill = (desiredSkills, skill) => {
    if (desiredSkills.split(",").indexOf(skill) != -1) {
      const firstHalf = desiredSkills.slice(0, desiredSkills.indexOf(skill))
      const secondHalf = desiredSkills.slice(desiredSkills.indexOf(skill) + 1 + skill.length)
      desiredSkills = firstHalf + secondHalf
    }
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



    fetch('http://' + global.api + '/match', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //need to get match id , mentor, and mentee id
          "match_id": 67844,
          "mentor_id": 10101, 
          "mentee_id": 20101
              
        }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.log("error is: " + error);
      });

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