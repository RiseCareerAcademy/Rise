import React from "react";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  View
} from "react-native";
import { AuthSession } from "expo";

import { MonoText } from "../components/StyledText";

export default class MentorRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null
    };
  }

 

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input placeholder="Enter your email" />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
            </Item>
            <Item stackedLabel>
              <Label>Skills</Label>
              <Input placeholder="Enter skills you want to learn" />
            </Item>
            <Item stackedLabel last>
              <Label>Profession</Label>
              <Input placeholder="Enter profession you want to learn" />
            </Item>
          </Form>
        </Content>
        <View>
          <Button full light onPress={() => navigate("Main")}>
            <Text style={styles.greyText}>Next</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonStyle: {
    margin: 10
  },
  greyText: {
    color: "grey"
  },
  contentContainer: {
    paddingTop: 30
  },
  container: {
    margin: 5,
  },
});
