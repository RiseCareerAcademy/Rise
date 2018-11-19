import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Keyboard
} from "react-native";
import { Message } from "../components/view";
import * as Animatable from "react-native-animatable";
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
  SwipeRow,
  Button,
  Icon
} from "native-base";
import { connect } from "react-redux";

import { getMessages } from '../actions/messages.actions';

const uuidv1 = require("uuid/v1");

export class Messages extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    showActivityIndicator: true,
    searchBarFocused: false,
    messages: [],
    matches: [],
    text: "",
    lastChecked: "",
    allMessages: []
  };

  constructor(props) {
    super(props);

    this.props.getMessages();
  }

  handleMessagePress = () => {
    this.props.navigation.navigate('Conversation');
  }

  render() {
    const { messages } = this.props;
    return (
      <Container>
        <Header />
        <Content>
          <List>
            {messages.map(message => (
                <ListItem avatar key={message.otherUserId} onPress={this.handleMessagePress}>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: message.otherUser.profile_pic_URL,
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{`${message.otherUser.first_name} ${message.otherUser.last_name}`}</Text>
                    <Text note>
                      {!message.empty ? message.message_body : 'No messages...'}
                    </Text>
                  </Body>
                  <Right>
                    {!message.empty && <Text note>{message.timestamp}</Text>}
                  </Right>
                </ListItem> 
              )
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    width: 100 + "%",
    height: 100 + "%",
    display: "flex",
    backgroundColor: "rgb(243, 243, 243)",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
};

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(
  mapStateToProps,
  {
    getMessages,
  }
)(Messages);
