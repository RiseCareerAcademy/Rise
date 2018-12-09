import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from "react-native";
import { SearchBar, CheckBox } from "react-native-elements";
import { connect } from "react-redux";

import {
  getAllMentees,
  getAllMentors,
  getAllMatches,
  getMentee,
  getMentor,
} from "../actions/search.actions";
import { Content } from "native-base";
import UsersList from "../components/UsersList";

export class SearchScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    //array of matches with respective scores
    results: [],
    checkedSkills: true,
    checkedProfessions: true,
    checkedMentors: true,
    checkedMentees: true,
    checkedMatches: true,
    checkedNames: true,
    data: [],
    mentors: [],
    mentees: [],
    matches: [],
    mentorsLoaded: false,
    menteesLoaded: false,
    matchesLoaded: false,
    refreshing: false,
  };
  //search function
  search = () => {};

  constructor(props) {
    super(props);

    this.props.getAllMentors();
    this.props.getAllMentees();
    this.props.getAllMatches();
    this.menteesLoaded = false;
    this.mentorsLoaded = false;
    this.matchesLoaded = false;
  }

  componentDidUpdate = prevProps => {
    if (prevProps.mentors !== this.props.mentors) {
      this.setState({ mentors: this.props.mentors, mentorsLoaded: true });
      this.mentorsLoaded = true;
      if (this.mentorsLoaded && this.menteesLoaded) {
        this.setState({ refreshing: false });
      }
    }
    if (prevProps.mentees !== this.props.mentees) {
      this.setState({ mentees: this.props.mentees, menteesLoaded: true });
      this.menteesLoaded = true;
      if (this.mentorsLoaded && this.menteesLoaded) {
        this.setState({ refreshing: false });
      }
    }
    if (prevProps.matches !== this.props.matches) {
      this.setState({ matches: this.props.matches, matchesLoaded: true });
      this.matchesLoaded = true;
      if (this.mentorsLoaded && this.matchesLoaded) {
        this.setState({ refreshing: false });
      }
    }
  };

  /**
   * Searches for
   */
  handleSearch = searchText => {
    console.log(this.props);
    this.setState({
      matches: this.props.matches.filter(user => {
        return Object.entries(user)
          .filter(([key]) =>
            ["first_name", "last_name", "skills", "profession"].includes(key)
          )
          .some(([, entry]) => {
            if (typeof entry === "string") {
              return entry.split(" ").some(word => {
                return searchText.split(" ").some(searchTextWord => {
                  return word.indexOf(searchTextWord) === 0;
                });
              });
            }
            return false;
          });
      }),
      mentees: this.props.mentees.filter(mentee => {
        return Object.entries(mentee)
          .filter(([key]) =>
            ["first_name", "last_name", "skills", "profession"].includes(key)
          )
          .some(([, entry]) => {
            if (typeof entry === "string") {
              return entry.split(" ").some(word => {
                return searchText.split(" ").some(searchTextWord => {
                  return word.indexOf(searchTextWord) === 0;
                });
              });
            }
            return false;
          });
      }),
      mentors: this.props.mentors.filter(mentor => {
        return Object.entries(mentor)
          .filter(([key]) =>
            ["first_name", "last_name", "skills", "profession"].includes(key)
          )
          .some(([, entry]) => {
            if (typeof entry === "string") {
              return entry.split(" ").some(word => {
                return searchText.split(" ").some(searchTextWord => {
                  return word.indexOf(searchTextWord) === 0;
                });
              });
            }
            return false;
          });
      }),
    });
  };

  handleMentorPress = user_id => {
    this.props.getMentor(user_id);
  };

  handleMenteePress = user_id => {
    this.props.getMentee(user_id);
  };

  handleMatchPress = user_id => {
    const isMentor = user_id[0] === '1';
    if (isMentor) {
      this.props.getMentor(user_id);
    } else {
      this.props.getMentee(user_id);
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.menteesLoaded = false;
    this.mentorsLoaded = false;
    this.props.getAllMentors();
    this.props.getAllMentees();
  };

  render() {
    return (
      <View style={styles.container}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
        <SearchBar
          showLoading
          platform="ios"
          cancelButtonTitle="Cancel"
          placeholder="Search"
          onChangeText={this.handleSearch}
        />
          <CheckBox
            title="Matches"
            checked={this.state.checkedMatches}
            onPress={() =>
              this.setState(prevState => ({
                checkedMatches: !prevState.checkedMatches,
              }))
            }
          />
          <CheckBox
            title="Mentors"
            checked={this.state.checkedMentors}
            onPress={() =>
              this.setState(prevState => ({
                checkedMentors: !prevState.checkedMentors,
              }))
            }
          />

          <CheckBox
            title="Mentees"
            checked={this.state.checkedMentees}
            onPress={() =>
              this.setState(prevState => ({
                checkedMentees: !prevState.checkedMentees,
              }))
            }
          />
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
          {this.state.checkedMatches && this.state.matches.length > 0 && (
            <View>
              <View>
                <Text>Matches:</Text>
              </View>
              <UsersList
                users={this.state.matches}
                onUserPress={this.handleMatchPress}
              />
            </View>
          )}
            {this.state.checkedMentors && this.state.mentors.length > 0 && (
              <View>
                <View>
                  <Text>Mentors:</Text>
                </View>
                <UsersList
                  users={this.state.mentors}
                  onUserPress={this.handleMentorPress}
                />
              </View>
            )}
            {this.state.checkedMentees && this.state.mentees.length > 0 && (
              <View>
                <View>
                  <Text>Mentees:</Text>
                </View>
                <UsersList
                  users={this.state.mentees}
                  onUserPress={this.handleMenteePress}
                />
              </View>
            )}
          </Content>
        </Content>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonStyle: {
    margin: 10,
  },
  greyText: {
    color: "grey",
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
});

const mapStateToProps = state => ({
  matches: state.search.matches,
  mentors: state.search.mentors,
  mentees: state.search.mentees,
});

export default connect(
  mapStateToProps,
  {
    getAllMentors,
    getAllMentees,
    getAllMatches,
    getMentor,
    getMentee,
  }
)(SearchScreen);
