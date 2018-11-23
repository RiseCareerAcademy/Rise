import React, { Component } from "react";
import { connect } from "react-redux";

import { uploadProfilePic, login } from "../actions/user.actions";
import Profile from "../components/Profile";
import {
  Header,
  View,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right
} from "native-base";

class PreviewScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button transparent onPress={this.handleBackPress}>
              <Icon name="md-arrow-round-back" />
            </Button>
          </Left>
          <Body>
            <Title>Profile Preview</Title>
          </Body>
        </Header>
        <Profile {...this.props.navigation.state.params} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.user,
  profile_pic_URL: state.user.image || state.user.profile_pic_URL
});

export default connect(
  mapStateToProps,
  { uploadProfilePic, login }
)(PreviewScreen);
