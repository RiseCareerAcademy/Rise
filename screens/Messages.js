import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  View,
} from "native-base";
import { connect } from "react-redux";
import { RefreshControl, StyleSheet } from "react-native";

import { getMessages } from "../actions/messages.actions";
import { HOST } from "../config/url";

const uuidv1 = require("uuid/v1");

export class Messages extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    showActivityIndicator: true,
    searchBarFocused: false,
    messages: [],
    matches: [],
    text: "",
    lastChecked: "",
    allMessages: [],
    refreshing: false,
    hasMessages: undefined,
  };

  constructor(props) {
    super(props);

    this.props.getMessages();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.messages !== this.props.messages) {
      this.setState({
        refreshing: false,
        hasMessages: this.props.messages.length > 0,
      });
    }
  };

  handleMessagePress = (match_id, to_id, otherUser) => () => {
    this.props.navigation.navigate("Conversation", {
      match_id,
      to_id,
      otherUser,
    });
  };

  onRefresh = () => {
    this.props.getMessages();
    this.setState({ refreshing: true });
  };

  render() {
    const { messages = [] } = this.props;
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
            {this.state.hasMessages === false && (
              <View style={styles.noMessagesContainer}>
                <Text style={styles.noMessagesText}>
                  You have not been matched yet. Please go to the Suggest
                  Matches or Search tab to find a match.
                </Text>
              </View>
            )}
            {messages.map(message => {
              const { otherUser } = message;
              const fromLinkedin = otherUser.profile_pic_URL.includes("licdn");
              let image =
                __DEV__ && !fromLinkedin
                  ? `http://${HOST}/user/${otherUser.user_id}/profilepic`
                  : otherUser.profile_pic_URL;
              if (!fromLinkedin) {
                image += `?${encodeURI(uuidv1())}`;
              }
              return (
                <ListItem
                  avatar
                  key={message.otherUserId}
                  onPress={this.handleMessagePress(
                    message.match_id,
                    message.otherUserId,
                    message.otherUser
                  )}
                >
                  <Left>
                    <Thumbnail
                      source={{
                        uri: image,
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{`${message.otherUser.first_name} ${
                      message.otherUser.last_name
                    }`}</Text>
                    <Text note>
                      {!message.empty ? message.message_body : "No messages..."}
                    </Text>
                  </Body>
                  <Right>
                    {!message.empty && <Text note>{message.timestamp}</Text>}
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  noMessagesContainer: {
    margin: "auto",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesText: {
    color: "grey",
    margin: "auto",
  },
});

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(
  mapStateToProps,
  {
    getMessages,
  }
)(Messages);
