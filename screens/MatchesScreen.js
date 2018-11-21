import React, { Component } from "react";
import { List, ListItem } from 'react-native-elements';
import { View } from "react-native";
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
              this.props.mentors.map(l => (
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

const mapStateToProps = state => ({
  mentors: state.matches.mentors,
})

export default connect(mapStateToProps, {
  getMatches,
})(MatchesScreen);
