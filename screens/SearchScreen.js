import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import Expo from "expo";
import { connect } from "react-redux";

import { getAllMentees, getAllMentors } from "../actions/search.actions";
import { DOMAIN } from "../config/url";

const uuidv1 = require('uuid/v1');

export class SearchScreen extends Component {
  state = {
    //array of matches with respective scores
    results: [],
    checkedSkills: true,
    checkedProfessions: true,
    checkedMentors: true,
    checkedMentees: true,
    checkedNames: true,
    data: [],
    mentors: [],
    mentees: [],
  };
  //search function
  search = () => {
    
  }

  constructor(props) {
    super(props);

    //TODO: API call function
    //WILL THROW TYPEERROR ON THIS SYSTEM

    //   const { manifest } = Expo.Constants;
    //   const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    // ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
    // : `api.example.com`;

    //   fetch('http://'+api+'/user/mentors',{
    //     method: 'GET'
    //   })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log("IT WORKED");

    //   })
    //   .catch((error) => {
    //     console.log("error isss: " + error);
    //   });

    this.props.getAllMentors();
    this.props.getAllMentees();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.mentors !== this.props.mentors) {
      this.setState({ mentors: this.props.mentors });
    }
    if (prevProps.mentees !== this.props.mentees) {
      this.setState({ mentees: this.props.mentees });
    }
  }

  //search function
  search = () => {
    const { navigation } = this.props;
    var searchInput = navigation.getParam("text").toString();
    searchInput = searchInput.toLowerCase();

    var results = [];
    var scores = [];
    var currArray = "";
    var tempPostman = "";

    tempPostman = "21542330576964,11542331557063,11542339784414";
    currArray = tempPostman.split(",");

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

    //BY PROFESSIONS
    if (this.state.checkedProfessions) {
      tempPostman = "21542330576964";
      currArray = tempPostman.split(",");
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
    if (this.state.checkedNames) {
      tempPostman = "21542330576964";
      currArray = tempPostman.split(",");
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

    var finalResults = [];
    var finalScores = [];

    //BY MENTOR/MENTEE
    if (this.state.checkedMentors) {
      for (i = 0; i < results.length; i++) {
        if (results[i].charAt(0) == "1") {
          finalResults[finalResults.length] = results[i];
          finalScores[finalScores.length] = scores[i];
        }
      }
    }
    if (this.state.checkedMentees) {
      for (i = 0; i < results.length; i++) {
        if (results[i].charAt(0) == "2") {
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
    console.log("RESULT OF SEARCH");
    for (i = 0; i < results.length; i++) { console.log(results[i]); }

    this.state.results = results;

    for (i = 0; i < finalResults.length; i++) {
      console.log(finalResults[i].toString());
    }

    this.state.results = finalResults;

    return;
  };

  makeListData = results => {
    this.state.data = [
      { name: "Margie Hadjiev", skills: "Sleeping", profession: "god" },
      { name: "Margie Chan", skills: "CCAC", profession: "buddha" }
    ];
  };

  /**
   * Searches for 
   */
  handleSearch = searchText => {
    console.log(this.props);
    this.setState({
      mentees: this.props.mentees.filter(mentee => {
        return Object.entries(mentee).filter(([key]) => ['first_name', 'last_name', 'skills', 'profession'].includes(key))
        .some(([key, entry]) => {
          if (typeof entry === 'string') {
            return entry.split(' ').some(word => {
              return searchText.split(' ').some(searchTextWord => {
                return word.indexOf(searchTextWord) === 0;
              })
            });
          }
          return false;
        });
      }),
      mentors: this.props.mentors.filter(mentor => {
        return Object.entries(mentor).filter(([key]) => ['first_name', 'last_name', 'skills', 'profession'].includes(key))
         .some(([key, entry]) => {
          if (typeof entry === 'string') {
            return entry.split(' ').some(word => {
              return searchText.split(' ').some(searchTextWord => {
                return word.indexOf(searchTextWord) === 0;
              })
            });
          }
          return false;
        });
      }),
    })
  }

  render() {
    // this.search();

    return (
      <View style={styles.container}>
        <SearchBar
          showLoading
          platform="ios"
          cancelButtonTitle="Cancel"
          placeholder="Search"
          onChangeText={this.handleSearch}
          // onSubmitEditing={() => navigate("Search", { text: this.state.text })}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
        
        <CheckBox title='Mentors' checked={this.state.checkedMentors}
        onPress={() => this.setState(prevState => ({checkedMentors: !prevState.checkedMentors}))}/>
        
        <CheckBox title='Mentees' checked={this.state.checkedMentees}
        onPress={() => this.setState(prevState => ({checkedMentees: !prevState.checkedMentees}))}/>  
      
      {
        this.state.checkedMentors && (
          <View>
            {this.state.mentors.length > 0 && <View><Text>Mentors:</Text></View>}
            <List>
              {this.state.mentors.map((mentor, i) => {
                const fromLinkedin = mentor.profile_pic_URL.includes("licdn");

                let image =
                  process.env.NODE_ENV === "development" && !fromLinkedin
                    ? `http://${DOMAIN}/user/${mentor.user_id}/profilepic`
                    : mentor.profile_pic_URL;
                if (!fromLinkedin) {
                  image += `?${encodeURI(uuidv1())}`;
                }

                return (
                  <ListItem
                    roundAvatar
                    title={`${mentor.first_name} ${mentor.last_name}`}
                    subtitle={`${mentor.profession} | ${mentor.skills}`}
                    avatar={{ uri: image }}
                    key={i}
                  />
                );
              })}
            </List>
          </View>
        )
      }
      {
        this.state.checkedMentees && (
          <View>
            {this.state.mentees.length > 0 && <View><Text>Mentees:</Text></View>}
            <List>
              {this.state.mentees.map((mentee, i) => {
                const fromLinkedin = mentee.profile_pic_URL.includes("licdn");

                let image =
                  process.env.NODE_ENV === "development" && !fromLinkedin
                    ? `http://${DOMAIN}/user/${mentee.user_id}/profilepic`
                    : mentee.profile_pic_URL;
                if (!fromLinkedin) {
                  image += `?${encodeURI(uuidv1())}`;
                }

                return (
                  <ListItem
                    roundAvatar
                    title={`${mentee.first_name} ${mentee.last_name}`}
                    subtitle={`${mentee.profession} | ${mentee.skills}`}
                    avatar={{ uri: image }}
                    key={i}
                  />
                );
              })}
          </List>
          </View>
        )
      }
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
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey"
  }
});

const mapStateToProps = state => ({
  mentors: state.search.mentors,
  mentees: state.search.mentees
});

export default connect(
  mapStateToProps,
  {
    getAllMentors,
    getAllMentees
  }
)(SearchScreen);
