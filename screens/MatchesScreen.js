import React, { Component } from "react";
import { ScrollView, StyleSheet, View, SectionList, Text } from "react-native";
import Expo from "expo";
// import { Graph } from 'react-d3-graph';

export default class MatchesScreen extends Component {
  state = {
    desiredSkills: ["Agile Methodologies", "UX", "Prototyping","JAVA","123"], //temp
    desiredProfessions: ["PM"], //temp
    //array of matches with respective scores
    matches: [],
    scores: [],
    mentorsFromServer: [],
    error: "hi"
  };

  constructor(props) {
    super(props);
    var mentors = [];
    //populate array with data from database

    const { manifest } = Expo.Constants;
    this.api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    console.log(this.api);
    fetch('http://' + this.api + '/user/mentor', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //TO DO: add mentors name and skills in array
        
        for (var i = 0; i < responseJson.rows.length; i++){
            var curr_row = responseJson.rows[i];
            mentors.push([curr_row.first_name])
            mentors.push([curr_row.profession])
            mentors.push( curr_row.skills);
       }
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
  match = async (desiredSkills, desiredProfessions, fakeData) => {
    // if (! global.Buffer) {
    //   global.Buffer = require("buffer").Buffer;
    // }
    // var findMatching = require("bipartite-matching")
    // console.log(findMatching(5, 5, [
    //   [0, 0],
    //   [0, 1],
    //   [1, 0],
    //   [2, 1],
    //   [2, 2],
    //   [3, 2],
    //   [3, 3],
    //   [3, 4],
    //   [4, 4]
    // ]))
    const scores = [[]];
    scores[0][0] = 0;
    // const menteeNode = {id: , profession: desiredProfessions, skills: desiredSkills};

    let i;
    //get user by profession, loop through users and add to mentorNodes if they are mentor
    
    //go through skills
    for (i = 0; i < desiredSkills.length; i++){
      try {
        //gets all user ids with the skill
        const response = await fetch( 'http://' + this.api+'/user/skill/'+desiredSkills[i], {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
        });
        const { rows: users } = await response.json();
        // check if skills is empty
        if (users.length != 0){
          // go through all user ids 
          for (i = 0; i < users.length; i++){
            var flag = false;
            //add new row with user id at index 0 if user id belongs to a mentor
            if(String(users[i].user_id).charAt(0) == "1"){
              //check if scores array already has this mentor
              for (i = 0; i < scores.length-1; i++){
                  if (scores[i+1][0] == users[i].user_id){
                    flag = true;
                  }
              }
              //push new row if scores doesnt conatain this mentor
              if (!flag){
                scores.push([users[i].user_id])
                flag = false
              }
              //same process for mentees
              }else{
                for (i = 0; i < scores.length-1; i++){
                if (scores[0][i+1] == users[i].user_id){
                  flag = true;
                }
              }
            if (!flag){
                scores[0].push([users[i].user_id])
                flag = false
            }
              }
            }
            console.log(scores)
            break;
          }

            //get users by skills, loop through users and check if they are mentor then add to mentorNodes
      } catch (error) {
        console.error("error is " + error);
      }
    }

    // for (i = 0; i < mentee.skills; i++){
      
    // }

    // for (let i = 0; i < desiredSkills.length; i++) {
    //   for (let j = 0; j < fakeData.length; j += 3) {
    //     if (fakeData[j + 2].indexOf(desiredSkills[i]) > -1) {
    //       //if matching skill, add to match list, score ++
    //       if (matches.indexOf(fakeData[j]) > -1)
    //         //if already has points
    //         scores[matches.indexOf(fakeData[j])] += 1;
    //       else {
    //         //else add to list of matches with new score
    //         matches[matches.length] = fakeData[j];
    //         scores[scores.length] = 1;
    //       }
    //     }
    //   }
    // }

    // for (let i = 0; i < desiredProfessions.length; i++) {
    //   for (let j = 0; j < fakeData.length; j += 3)
    //     if (fakeData[j + 1].indexOf(desiredProfessions[i]) > -1) {
    //       if (matches.indexOf(fakeData[j]) > -1)
    //         //if matching skill, add to match list, score ++
    //         //if already has points
    //         scores[matches.indexOf(fakeData[j])] += 3;
    //       else {
    //         //else add to list of matches with new score
    //         matches[matches.length] = fakeData[j];
    //         scores[scores.length] = 3;
    //       }
    //     }
    // }

    // //sort by score
    // for (let i = 1; i < scores.length; i++) {
    //   for (let j = 0; j < i; j++) {
    //     if (scores[i] > scores[j]) {
    //       let x = scores[i];
    //       scores[i] = scores[j];
    //       scores[j] = x;
    //       let y = matches[i];
    //       matches[i] = matches[j];
    //       matches[j] = y;
    //     }
    //   }
    // }

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
          {
            /*
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
            */
          }
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
