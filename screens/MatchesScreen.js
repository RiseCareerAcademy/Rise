import React, { Component } from "react";
import { List, ListItem } from 'react-native-elements';
import { FlatList, ScrollView, View, StyleSheet } from "react-native";
import Expo from "expo";
import { create_matches_table_sql } from "../config/user_sql_constants";
import { connect } from 'react-redux';

import { getMatches } from '../actions/matches.actions';
import { Header } from "native-base";

export class MatchesScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  
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

    this.props.getMatches();
  }
  
  render () {
    return (
      <View>
          <Header />
          <List>
            {
              this.props.mentors.map((l, i) => (
                <ListItem
                  roundAvatar
                  key={l.user_id}
                  avatar={{ uri: l.profile_pic_URL }}
                  title={`${l.first_name} ${l.last_name}`}
                  subtitle={`${l.profession} | ${l.skills} | Score: ${l.score}`}
                />
              ))
            }
          </List>
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
})

const mapStateToProps = state => ({
  mentors: state.matches.mentors,
})

export default connect(mapStateToProps, {
  getMatches,
})(MatchesScreen);
