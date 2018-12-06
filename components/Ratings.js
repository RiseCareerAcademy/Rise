import React from "react";
import { StyleSheet } from "react-native";
import { Text, Container, Item, Label, Input } from "native-base";
import StarRating from "react-native-star-rating";
class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3,
      question1: "",
      qustion2: "",
      question3: "",
    };
  }
  handleQ1 = text => {
    this.setState({ question1: text });
  };
  handleQ2 = text => {
    this.setState({ question2: text });
  };
  handleQ3 = text => {
    this.setState({ question3: text });
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    const { first_name, last_name } = this.props.userToRate;
    return (
      <Container style={styles.container}>
        <Text style={styles.center}>
          Rate {first_name} {last_name}
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.starCount}
          selectedStar={rating => this.onStarRatingPress(rating)}
        />
        <Item stackedLabel>
          <Label>Did your mentor provide services in a timely manner?</Label>
          <Input placeholder="Enter response" onChangeText={this.handleQ1} />
        </Item>
        <Item stackedLabel>
          <Label>
            Did you experience any difficulties or challenges in your
            relationship with your mentor?
          </Label>
          <Input placeholder="Enter response" onChangeText={this.handleQ2} />
        </Item>
        <Item stackedLabel>
          <Label>
            Was there anything that your mentor did particularly well?
          </Label>
          <Input placeholder="Enter response" onChangeText={this.handleQ3} />
        </Item>
      </Container>
    );
  }
}
export default Ratings;
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#000000",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignSelf: "center",
  },
  buttonStyle: {
    margin: 10,
  },
  greyText: {
    color: "grey",
  },
  contentContainer: {
    paddingTop: 30,
  },
});
