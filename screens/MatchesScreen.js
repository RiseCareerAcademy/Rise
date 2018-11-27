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
import { DOMAIN } from "../config/url";

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

  onRefresh = () => {
    const isMentor = this.props.user_id[0] === '1';
    if (isMentor) {
      this.props.getSuggestedMenteeMatches();
    } else {
      this.props.getSuggestedMentorMatches();
    }
  }

  handleMentorPress = user_id => {
    this.props.getMentor(user_id);
  };

  handleMenteePress = user_id => {
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
            {this.props.users.map(l => {
              let fromLinkedin = false;
            if (l.profile_pic_URL !== undefined) {
              fromLinkedin = l.profile_pic_URL.includes("licdn");
            }

            let image =
              process.env.NODE_ENV === "development" && !fromLinkedin
                ? `http://${DOMAIN}/user/${l.user_id}/profilepic`
                : l.profile_pic_URL;
            if (!fromLinkedin) {
              image += `?${encodeURI(uuidv1())}`;
            }

            let handlePress;
            if (l.user_id !== undefined) {
              const isMentor = l.user_id[0] === '1';
              if (isMentor) {
                handlePress = this.handleMentorPress;
              } else {
                handlePress = this.handleMenteePress;
              }
            }
              return (<Card style={{ flex: 0 }} key={l.user_id}>
                <CardItem onPress={handlePress}>
                  <Left>
                    <Thumbnail source={{ uri: image}} />
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
              </Card>)
            })}
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
