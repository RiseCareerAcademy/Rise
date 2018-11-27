import React, { Component } from "react";
import { RefreshControl } from "react-native";
import { connect } from "react-redux";
import {
  Header,
  Content,
  List,
  Left,
  Thumbnail,
  Body,
  Text,
  Button,
  Container,
  Card,
  CardItem,
} from "native-base";

import { getSuggestedMentorMatches, getSuggestedMenteeMatches } from "../actions/matches.actions";

const uuidv1 = require("uuid/v1");

export class MatchesScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    desiredSkills: "",
    desiredProfession: "",
    //array of matches with respective scores
    matches: [],
    list: [],
    error: "hi",
    refreshing: false,
  };

  constructor(props) {
    super(props);

    const isMentor = this.props.user_id[0] === '1';
    if (isMentor) {
      this.props.getSuggestedMenteeMatches();
    } else {
      this.props.getSuggestedMentorMatches();
    }
    this.hash = uuidv1();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.users !== this.props.users) {
      this.setState({ refreshing: false });
    }
  };

  render() {
    return (
      <Container>
        <Header />
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <List>
            {this.props.users.map(l => (
              <Card style={{ flex: 0 }} key={l.user_id}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: `${l.profile_pic_URL}?${this.hash}`}} />
                    <Body>
                      <Text>{`${l.first_name} ${l.last_name}`}</Text>
                      <Text note>{l.profession}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{l.biography}</Text>
                    <Text>{l.skills}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent textStyle={{ color: "#87838B" }}>
                      <Text>{`Score: ${l.score}`}</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: state.matches.users,
  user_id: state.user.user_id,
});

export default connect(
  mapStateToProps,
  {
    getSuggestedMentorMatches,
    getSuggestedMenteeMatches,
  }
)(MatchesScreen);
