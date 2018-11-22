import React, { Component } from "react";
import { View, RefreshControl } from "react-native";
import { connect } from "react-redux";

import { getMatches } from "../actions/matches.actions";
import {
  Header,
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  Button,
  Container,
  Card,
  CardItem,
  Image,
  Icon,
} from "native-base";

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

    this.props.getMatches();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.mentors !== this.props.mentors) {
      this.setState({ refreshing: false });
    }
  };

  onRefresh = () => {
    this.props.getMessages();
    this.setState({ refreshing: true });
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
            {this.props.mentors.map(l => (
              <Card style={{ flex: 0 }} key={l.user_id}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: l.profile_pic_URL }} />
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
  mentors: state.matches.mentors,
});

export default connect(
  mapStateToProps,
  {
    getMatches,
  }
)(MatchesScreen);
