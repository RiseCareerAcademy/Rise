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

import { getMatches } from "../actions/matches.actions";

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
  
  render =()=> {
    return (
      <List>
        <FlatList
          data={this.state.list}
          renderItem={this.renderRow}
          keyExtractor={item => item.name}

        />
      </List>
    )
  }

}

<<<<<<< HEAD

=======
const mapStateToProps = state => ({
  mentors: state.matches.mentors,
});

export default connect(
  mapStateToProps,
  {
    getMatches,
  }
)(MatchesScreen);
>>>>>>> origin
