import React, { Component } from "react";
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'

import { sendMessage, setMatchId } from '../actions/conversation.actions';

class Conversation extends Component {
  constructor(props) {
    super(props);

    const { to_id, match_id } = this.props.navigation.state.params;

    this.props.setMatchId(match_id, to_id);
  }

  onSend = (messages) => {
    const { user_id } = this.props;
    const { to_id, match_id } = this.props.navigation.state.params;
    console.log(messages);
    const message = messages[0];
    this.props.sendMessage({ match_id, from_id: user_id, to_id, message_body: message.text });
  }

  render() {
    const { user_id, first_name, last_name, messages } = this.props;
    const { otherUser } = this.props.navigation.state.params;
    const currUserName = `${first_name} ${last_name}`;
    const otherUserName = `${otherUser.first_name} ${otherUser.last_name}`;

    const giftedChatMessages = messages.map(message => ({
      _id: message.message_id,
      text: message.message_body,
      createdAt: message.timestamp,
      user: {
        _id: message.from_id,
        name: message.from_id === user_id ? currUserName : otherUserName,
        avatar: otherUser.profile_pic_URL,
      },
    }));

    return (
      <GiftedChat
        messages={giftedChatMessages}
        onSend={this.onSend}
        user={{
          _id: user_id,
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...state.user,
  messages: state.conversation.messages,
});

export default connect(mapStateToProps, {
  sendMessage,
  setMatchId,
})(Conversation);
