import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";

import { getAllMentees, getAllMentors, getMentee, getMentor } from "../actions/search.actions";
import { DOMAIN } from "../config/url";

const uuidv1 = require('uuid/v1');

export class SearchScreen extends Component {
  static navigationOptions = {
    header: null,
  }

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

  /**
   * Searches for 
   */
  handleSearch = searchText => {
    console.log(this.props);
    this.setState({
      mentees: this.props.mentees.filter(mentee => {
        return Object.entries(mentee).filter(([key]) => ['first_name', 'last_name', 'skills', 'profession'].includes(key))
        .some(([, entry]) => {
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
         .some(([, entry]) => {
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

  handleMentorPress = user_id => () => {
    this.props.getMentor(user_id);
  }

  handleMenteePress = () => () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          showLoading
          platform="ios"
          cancelButtonTitle="Cancel"
          placeholder="Search"
          onChangeText={this.handleSearch}
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
                    onPress={this.handleMentorPress(mentor.user_id)}
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
              {this.state.mentees.map(mentee => {
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
                    key={mentee.user_id}
                    onPress={this.handleMenteePress(mentee.user_id)}
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
    getAllMentees,
    getMentor,
    getMentee,
  }
)(SearchScreen);
