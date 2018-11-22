import React, { Component } from "react";
import { connect } from "react-redux";

import Profile from "../components/Profile";
import { Container, Header, Body, Title, Content, Button, Left, Icon } from "native-base";

class MenteeProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
  }

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
            <Title>Mentee</Title>
          </Body>
        </Header>
        <Content>
          <Profile {...this.props.navigation.state.params} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {}
)(MenteeProfileScreen);
