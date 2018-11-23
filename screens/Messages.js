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
} from "native-base";
import { connect } from "react-redux";
import { RefreshControl } from "react-native";

import { getMessages } from "../actions/messages.actions";

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
  };

  constructor(props) {
    super(props);

    this.props.getMessages();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.messages !== this.props.messages) {
      this.setState({ refreshing: false });
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
              onRefresh={this._onRefresh}
            />
          }
        >
          <List>
            {messages.map(message => (
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
                      uri: message.otherUser.profile_pic_URL,
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
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(
  mapStateToProps,
  {
    getMessages,
  }
)(Messages);
