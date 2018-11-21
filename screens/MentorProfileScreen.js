import React, { Component } from "react";
import { connect } from "react-redux";

import Profile from "../components/Profile";

class MentorProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <Profile {...this.props.navigation.state.params} canMatch />;
  }
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {}
)(MentorProfileScreen);
