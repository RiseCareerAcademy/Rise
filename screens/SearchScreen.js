import React, { Component } from "react";
import { ScrollView, StyleSheet, View, SectionList, Text, Image } from "react-native";
import { List, ListItem, FlatList } from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import Expo from "expo";
export default class SearchScreen extends Component {
  state = {
    //array of matches with respective scores
    results: [],
    advancedResults: [],
    checkedSkills: true,
    checkedProfessions: true,
    checkedMentors: true,
    checkedMentees: true,
    checkedNames: true,
    tempPostman: "",
    data: [{
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      profession: 'Doctor'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      profession: 'Nurse'
    }]
  };
  //search function
  search = () => {
    
  }

  constructor(props) {
    super(props);
    this.search();
    this.toggleButtons(); this.makeListData();
    const { navigation } = this.props;
    var searchInput = navigation.getParam('text').toString();
    //searchInput = searchInput.toLowerCase();
    var results = [];
    var scores = [];
    var currArray = [];
    var tempPostman = '';
    const { manifest } = Expo.Constants;
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;
    fetch('http://' + api + '/user/skill/' + searchInput, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        tempPostman = responseJson.rows[0].users;
        console.log(tempPostman)
        this.state.tempPostman = tempPostman
      })
      .catch((error) => {
        console.log("error issfoskill: " + error);
        tempPostman = '';
      });

    //BY SKILL
    if (this.state.checkedSkills) {
      //tempPostman = "21542330576964,11542331557063,11542339784414";
      console.log(tempPostman)
      if (tempPostman.includes(',')) {
        console.log("hi")
        currArray = tempPostman.split(',');
        console.log('MULTIPLE WITH THAT SKILL')
      } else {
        currArray = [];
      }
      //for each ID with skill, add to results
      for (var i = 0; i < currArray.length; i++) {
        if (results.indexOf(currArray[i]) > -1) {
          //if id exists in results already
          scores[results.indexOf(currArray[i])] += 1;
        } else {
          results[results.length] = currArray[i];
          scores[scores.length] = 1;
        }
      }
    }
    console.log


    fetch('http://' + api + '/user/profession/' + searchInput, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        tempPostman = responseJson.rows[0].users;
      })
      .catch((error) => {
        console.log("error isss: " + error);
        tempPostman = '';
      });
    //BY PROFESSIONS
    if (this.state.checkedProfessions) {
      if (tempPostman.includes(',')) {
        currArray = tempPostman.split(',');
        console.log('MULTIPLE WITH THAT PROFESSION')
      } else {
        currArray = [];
      }
      //for each ID with skill, add to results
      for (i = 0; i < currArray.length; i++) {
        if (results.indexOf(currArray[i]) > -1) {
          //if id exists in results already
          scores[results.indexOf(currArray[i])] += 3;
        } else {
          results[results.length] = currArray[i];
          scores[scores.length] = 3;
        }
      }
    }



    //BY NAMES
    /*TODO: this cannot be implemented without the getIDByName 
    if (this.state.checkedNames) {
      tempPostman = ""
      currArray = tempPostman.split(',');
      //for each ID with skill, add to results
      for (i = 0; i < currArray.length; i++) {
        if (results.indexOf(currArray[i]) > -1) {
          //if id exists in results already
          scores[results.indexOf(currArray[i])] += 2;
        } else {
          results[results.length] = currArray[i];
          scores[scores.length] = 2;
        }
      }
    }
    */

    //sort by score
    for (let i = 1; i < scores.length; i++) {
      for (let j = 0; j < i; j++) {
        if (scores[i] > scores[j]) {
          let x = scores[i];
          scores[i] = scores[j];
          scores[j] = x;
          let y = results[i];
          results[i] = results[j];
          results[j] = y;
        }
      }
    }
    console.log("RESULT OF SEARCH");
    for (i = 0; i < results.length; i++) { console.log(results[i]); }

    this.state.results = results;

  }

  toggleButtons() {
    //BY MENTOR/MENTEE
    
    for (var i = 0; i < this.state.results.length; i++){
      if (this.state.checkedMentors) {
        if (this.state.results[i].charAt(0) == '1') {
          this.state.advancedResults[this.state.advancedResults.length] = this.state.results[i];
        }
      }
      if (this.state.checkedMentees) {
        if (this.state.results[i].charAt(0) == '2') {
          this.state.advancedResults[this.state.advancedResults.length] = this.state.results[i];
        }
      }
    }

    console.log("ADVENCED SEARCH RESULTS");
    console.log(this.state.advancedResults);

    return;
  }

  makeListData = () => {
    //Method populates data formatted to work with flatlist
    var currUser = [];

    const { manifest } = Expo.Constants;
    const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
      : `api.example.com`;

    for (var i = 0; i < this.state.advancedResults.length; i++) {
      fetch('http://' + api + '/user/' + this.state.advancedResults[i], {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((responseJson) => {
          currUser = responseJson;
        })
        .catch((error) => {
          console.log("THERE IS NO USER BY THIS ID: " + error);
          currUser = { name: 'error', avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', profession: "error" }
        });
      this.state.data[i] = {
        name: currUser.first_name + currUser.lastName,
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        profession: currUser.profession
      };
    }

    return
  }


  onPressHelper = () => { this.toggleButtons(); this.makeListData(); return }

  renderRow = ({ item }) => {
    return (
      <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.profession}
        avatar={{ uri: item.avatar_url }}
      />
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <CheckBox title='Skills' checked={this.state.checkedSkills}
            onPress={() => { this.onPressHelper(); this.setState({ checkedSkills: !this.state.checkedSkills }); console.log(this.state.data[0].name); }}
          />
          <CheckBox title='Professions' checked={this.state.checkedProfessions}
            onPress={() => { this.onPressHelper(); this.setState({ checkedProfessions: !this.state.checkedProfessions }); console.log(this.state.data[0].name); }}
          />
          <CheckBox title='Mentors' checked={this.state.checkedMentors}
            onPress={() => { this.onPressHelper(); this.setState({ checkedMentors: !this.state.checkedMentors }); console.log(this.state.data[0].name); }}
          />
          <CheckBox title='Mentees' checked={this.state.checkedMentees}
            onPress={() => { this.onPressHelper(); this.setState({ checkedMentees: !this.state.checkedMentees }); console.log(this.state.data[0].name); }}
          />
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