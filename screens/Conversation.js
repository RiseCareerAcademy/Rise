import React, { Component } from "react";
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'

import { sendMessage, setMatchId } from '../actions/conversation.actions';

class Conversation extends Component {
  constructor(props) {
    super(props);

    const { to_id, match_id } = this.props;

    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: to_id,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    };

    this.props.setMatchId(to_id, match_id);
  }

  onSend(messages = []) {
    const { to_id, match_id, user_id } = this.props;
    console.log(messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.props.sendMessage({ match_id, from_id: user_id, to_id, message_body: messages[0].text });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  user_id: state.user.user_id,
});

export default connect(mapStateToProps, {
  sendMessage,
  setMatchId,
})(Conversation);
