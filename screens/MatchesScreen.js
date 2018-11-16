import React, { Component } from "react";
import { ScrollView, StyleSheet, View, SectionList, Text } from "react-native";
import Expo from "expo";
// import { Graph } from 'react-d3-graph';

export default class MatchesScreen extends Component {
  state = {
    desiredSkills: ["Agile Methodologies", "UX", "Prototyping", "JAVA", "123"], //temp
    desiredProfession: ["PM"], //temp
    //array of matches with respective scores
    matches: [],
    mentorsFromServer: [],
    error: "hi"
  };

  constructor(props) {
    super(props);
    var mentors = [];
    //populate array with data from database

    //TODO: GET DESIRED SKILL AND PROFESSIN
    //CALL MACTH ALGO
    const { manifest } = Expo.Constants;
    this.api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    console.log(this.api);
    fetch('http://' + this.api + '/user/21542322931999/skills', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ desiredSkills: responseJson.rows[0].skills })
        console.log("state of skill: " + this.state.desiredSkills)

        //const { desiredSkills, desiredProfession } = this.state;
        // const { matches } = this.match(desiredSkills, desiredProfession, mentors);
        //this.setState({ matches: matches });
      })
      .catch((error) => {
        console.log("error is: " + error);
      });

    //fetch professin
    fetch('http://' + this.api + '/user/21542322931999/profession', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({ desiredProfession: responseJson.rows[0].profession })
        console.log("state of profession: " + this.state.desiredProfession)

        //const { desiredSkills, desiredProfession } = this.state;
        // const { matches } = this.match(desiredSkills, desiredProfession, mentors);
        //this.setState({ matches: matches });
      })
      .catch((error) => {
        console.log("error is: " + error);
      });

    const { matches } = this.match(this.state.desiredSkills, this.state.desiredProfession);
    this.setState({ matches: matches });
  }

  //match function
  match = async (desiredSkills, desiredProfession) => {
    var map = {}

    // console.log(desiredSkills.length)
    //go through skills
    for (let i = 0; i < desiredSkills.length; i++) {
      try {
        //gets all user ids with the skill
        const response = await fetch('http://' + this.api + '/user/skill/' + desiredSkills[i], {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const { rows: users } = await response.json();
        // check if profession
        if (users.length != 0) {
          var len;
          if (String(users[0].users).includes(",")) {
            //length of users with the appropriate skill
            len = users[0].users.split(',').length
          } else {
            len = 1
          }

          //for lop to go through matches and find metors
          for (let j = 0; j < len; j++) {
            //get user id at ith index
            var id = users[0].users.split(',')[j];

            //if mentor
            if (String(id).charAt(0) == "1") {
              //if id is not in the map
              if (map[id] == undefined) {
                map[id] = 1;
                // console.log(map[id])
              } else {
                map[id]++;
              }
            }
          }
          console.log(map)
        }

        //get profession and add score
      } catch (error) {
        console.error("error is " + error);
      }
    }
    try {
      const response = await fetch('http://' + this.api + '/user/profession/' + desiredProfession, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const { rows: profession } = await response.json();
      // console.log(profession[0].users)
      if (profession.length != 0) {
        var proflen;
        if (String(profession[0].users).includes(",")) {
          //length of users with the matched profession
          proflen = profession[0].users.split(',').length
        } else {
          proflen = 1
        }

        //loop to check which profession belong to mentor
        for (let k = 0; k < proflen; k++) {
          var profid = profession[0].users.split(',')[k];
          if (String(profid).charAt(0) == "1") {
            if (map[profid] == undefined) {
              // console.log("prof id " + String(profid) +"is undefined")
              map[profid] = 1;
            } else {
              // console.log("prof id " + String(profid) + "has value of: " + map[profid])
              map[profid] += 2;
            }
          }
        }
        console.log(map)
        // console.log(map)
      }
    } catch (error) {
      console.error("error is " + error);
    }
    var unsortedValues = [];
    for (var key in map) {
      unsortedValues.push({
        'name': key,
        'value': map[key]
      });
    }
    console.log("unsorted: ")
    console.log(unsortedValues)
    const list = unsortedValues.sort((a, b) => a.value > b.value)
    console.log("sorted")
console.log(list)

    //put hashmap into matches array which has the user id's sorted

    return { matches };
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
