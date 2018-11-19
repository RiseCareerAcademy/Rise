import React, { Component } from "react";
import { connect } from "react-redux";

import { uploadProfilePic, login } from "../actions/user.actions";
import Profile from "../components/Profile";
import { Header, View } from "native-base";

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Header />
        <Profile {...this.props} />
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
)(ProfileScreen);
