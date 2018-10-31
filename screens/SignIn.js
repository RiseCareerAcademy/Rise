import React from "react";
import { Button, Text, Container, Content, Form, Item, Label, Input } from "native-base";
import { StyleSheet, View } from "react-native";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      result: null,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input/>
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input/>
            </Item>
          </Form>
        </Content>
        <View>
        <Button full light onPress={() =>
          navigate('Main')
        }>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
