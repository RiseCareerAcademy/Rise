import React, { Component } from "react";
import { connect } from "react-redux";

import Profile from "../components/Profile";
import { Header, Container, Content, Body, Title, Left, Button, Icon } from "native-base";

class MentorProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleBackPress}>
              <Icon name="md-arrow-round-back" />
            </Button>
          </Left>
          <Body>
            <Title>Mentor</Title>
          </Body>
        </Header>
        <Content>
          <Profile {...this.props.navigation.state.params} mentor />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {}
)(MentorProfileScreen);
