import React from "react";
import { List, ListItem, Left, Thumbnail, Body, Text } from "native-base";
import { HOST } from "../config/url";

const uuidv1 = require("uuid/v1");

class UsersList extends React.Component {
  state = {
    refreshing: false,
  }

  componentDidUpdate = prevProps => {
    if (prevProps.users !== this.props.users) {
      this.setState({ refreshing: false });
    }
  };

  onRefresh = () => {
    this.props.getMessages();
    this.setState({ refreshing: true });
  };

  handleUserPress = user_id => () => {
    console.log('testing');
    console.log(user_id);
    this.props.onUserPress(user_id);
  }

  render() {
    const { users } = this.props;
    return (
      // <Content
      //   refreshControl={
      //     <RefreshControl
      //       refreshing={this.state.refreshing}
      //       onRefresh={this.onRefresh}
      //     />
      //   }
      // >
        <List>
          {users.map(user => {
            const fromLinkedin = user.profile_pic_URL.includes("licdn");

            let image =
              __DEV__ && !fromLinkedin
                ? `http://${HOST}/user/${user.user_id}/profilepic`
                : user.profile_pic_URL;
            if (!fromLinkedin) {
              image += `?${encodeURI(uuidv1())}`;
            }

            return (
              <ListItem
                avatar
                button
                key={user.user_id}
                onPress={this.handleUserPress(user.user_id)}
              >
                <Left>
                  <Thumbnail source={{ uri: image }} />
                </Left>
                <Body>
                  <Text>{`${user.first_name} ${user.last_name}`}</Text>
                  <Text note>{`${user.profession} | ${user.skills}`}.</Text>
                </Body>
              </ListItem>
            );
          })}
        </List>
      // </Content>
    );
  }
}

export default UsersList;
