import React, { Component } from "react";
import { List, ListItem } from 'react-native-elements';
import { FlatList, AppRegistry, StyleSheet, Text, View  } from "react-native";
import Expo from "expo";
import { create_matches_table_sql } from "../config/user_sql_constants";
// import { Graph } from 'react-d3-graph';

export default class MatchesScreen extends Component {
  state = {
    desiredSkills: "",
    desiredProfession: "",
    //array of matches with respective scores
    matches: [],
    list: [],
    error: "hi"
  };
  

  constructor(props) {
    super(props);
    var numMatches;
    var tmpList = [];
    //CALL MACTH ALGO
    const { manifest } = Expo.Constants;
    this.api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    fetch('http://' + this.api + '/user/21542417645825/skills', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var fetchedSkills = responseJson.rows[0].skills
        this.state.desiredSkills = fetchedSkills
      })
      .catch((error) => {
        console.log("error is: " + error);
      });

    //fetch profession
    fetch('http://' + this.api + '/user/21542417645825/profession', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var fetchedProfession = responseJson.rows[0].profession
        this.state.desiredProfession = fetchedProfession
        const matches  = this.match(this.state.desiredSkills, this.state.desiredProfession);

        //matches store a promise
       matches.then(data => {
        this.setState({ matches: data });
        numMatches = Number.parseInt(this.state.matches.length)

        
        //loop through matches id and store into a list
        for (let i = 0; i < numMatches; i++){

          //need to get name, profile id, and profession from match id using fetch
          tmpList.push(
            {
              name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Vice President'
            }
          )
          this.setState({list:tmpList})
        }
        });


       
      })
      .catch((error) => {
        console.log("error is: " + error);
      });

      console.log(this.state.list)
     
  }

  //match function
  match = async (desiredSkills, desiredProfession) => {
    var map = {}

    //go through skills
console.log(desiredSkills)
      try {
        //gets all user ids with the skill
        const response = await fetch('http://' + this.api + '/user/skill/' + desiredSkills, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const { rows: users } = await response.json();
        console.log(users)
        // check if there is at least one person w/ matching profession
        if (users.length != 0) {
          var Skilllen;
          if (String(users[0].users).includes(",")) {
            //length of users with the matched profession
            Skilllen = users[0].users.split(',').length
          } else {
            Skilllen = 1
          }
          //for lop to go through matching skills and find mentor
          for (let j = 0; j < Skilllen; j++) {
            //get user id at ith index
            var id = users[0].users.split(',')[j];
            //if mentor
            if (String(id).charAt(0) == "1") {
              //if id is not in the map
              if (map[id] == undefined) {
                console.log(id)
                map[id] = 1;
              } else {
                console.log(id)
                map[id]++;
              }
            }
          }
        }

        //get profession and add score
      } catch (error) {
        console.error("error is " + error);
      }
  
    //for loop to go through profession
    console.log(desiredProfession)
    console.log(desiredSkills)
    try {
      const response = await fetch('http://' + this.api + '/user/profession/' + desiredProfession, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const { rows: profession } = await response.json();
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
            //if user has no matching skills, but matching profession
            if (map[profid] == undefined) {
              console.log(profid)
              map[profid] = 2;
              
            }
            //if user has matching profession and skills
            else {
              console.log(profid)
              map[profid] += 2;
            }

          }
        }
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

    //sort array by score
    unsortedValues.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0));


    var matches = []
    for (let i = 0; i < unsortedValues.length; i++) {
      matches.push(
        unsortedValues[i].name
      );
    }

    this.state.match = matches
    return matches
  }
  

  renderRow =({ item }) =>{
    return (
      <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.profession}
        avatar={{uri:item.avatar_url}}
      />
    )
  }
  
  render =()=> {
    return (
      <View>
  {
    this.state.list.map((l, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: l.avatar_url } }}
        title={l.name}
        subtitle={l.subtitle}
      />
    ))
  }
</View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})