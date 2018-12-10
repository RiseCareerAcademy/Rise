import React, { Component } from "react";
import { RefreshControl, StyleSheet } from "react-native";
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
  View,
} from "native-base";

import {
  getSuggestedMentorMatches,
  getSuggestedMenteeMatches,
} from "../actions/matches.actions";
import { getMentor, getMentee } from "../actions/search.actions";
import { HOST } from "../config/url";
import { Chip } from "react-native-paper";

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
    hasMatches: undefined,
  };

  constructor(props) {
    super(props);

    const isMentor = this.props.user_id[0] === "1";
    if (isMentor) {
      this.props.getSuggestedMenteeMatches();
    } else {
      this.props.getSuggestedMentorMatches();
    }
    this.hash = uuidv1();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.users !== this.props.users) {
      this.setState({
        refreshing: false,
        hasMatches: this.props.users.length > 0,
      });
    }
  };

  onRefresh = () => {
    const isMentor = this.props.user_id[0] === "1";
    if (isMentor) {
      this.props.getSuggestedMenteeMatches();
    } else {
      this.props.getSuggestedMentorMatches();
    }
  };

  handleMentorPress = user_id => () => {
    this.props.getMentor(user_id);
  };

  handleMenteePress = user_id => () => {
    this.props.getMentee(user_id);
  };

  render() {
    return (
      <Container>
        <Header />
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <List>
            {this.state.hasMatches === false && (
              <View style={styles.noMatchesContainer}>
                <Text style={styles.noMatchesText}>No Matches. Check back later in case there is a match!</Text>
              </View>
            )}
            {this.props.users.map(l => {
              let fromLinkedin = false;
              if (l.profile_pic_URL !== undefined) {
                fromLinkedin = l.profile_pic_URL.includes("licdn");
              }

              let image =
                __DEV__ && !fromLinkedin
                  ? `http://${HOST}/user/${l.user_id}/profilepic`
                  : l.profile_pic_URL;
              if (!fromLinkedin) {
                image += `?${encodeURI(uuidv1())}`;
              }

              let handlePress = () => {};
              if (l.user_id !== undefined) {
                const isMentor = l.user_id[0] === "1";
                if (isMentor) {
                  handlePress = this.handleMentorPress;
                } else {
                  handlePress = this.handleMenteePress;
                }
              }
              return (
                <Card style={{ flex: 0 }} key={l.user_id}>
                  <CardItem onPress={handlePress(l.user_id)}>
                    <Left>
                      <Thumbnail source={{ uri: image }} />
                      <Body>
                        <Text>{`${l.first_name} ${l.last_name}`}</Text>
                        <Text note>{l.profession}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{l.biography}</Text>
                      <View style={styles.chipsContainer}>
                        {l.skills.split(",").map(skill => (
                          <Chip
                            style={styles.chip}
                            key={skill}
                            icon="info"
                            onPress={() => console.log("Pressed")}
                          >
                            {skill}
                          </Chip>
                        ))}
                      </View>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button
                        transparent
                        textStyle={{ color: "#87838B" }}
                        onPress={handlePress(l.user_id)}
                      >
                        <Text>{`Click for details.`}</Text>
                      </Button>
                    </Left>
                    <Left>
                      <Text>{`Score: ${l.score}`}</Text>
                    </Left>
                  </CardItem>
                </Card>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  noMatchesContainer: {
    margin: "auto",
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMatchesText: {
    color: "grey",
    margin: "auto",
  },
  chipsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const mapStateToProps = state => ({
  users: state.matches.users,
  user_id: state.user.user_id,
});

export default connect(
  mapStateToProps,
  {
    getSuggestedMentorMatches,
    getSuggestedMenteeMatches,
    getMentee,
    getMentor,
  }
)(MatchesScreen);
