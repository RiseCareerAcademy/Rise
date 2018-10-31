import React, {Component} from "react";
import { Button, Text } from "native-base";
import { Platform, ScrollView, StyleSheet, Image, View, SectionList } from "react-native";


export default class MatchesScreen extends Component {
  state = {
    desiredSkills: ['Agile Methodologies', 'UX', 'Prototyping'], //temp
    desiredProfessions: ['Product Manager'], //temp
    //array of matches with respective scores
    matches: [],
    scores: [],
  }


  //match function
  match = (desiredSkills, desiredProfessions, fakeData) => {
    for (i = 0; i < desiredSkills.length; i++) {
      for (j = 0; j < fakeData.length; j += 3)
        if (fakeData[j + 2].indexOf(desiredSkills[i]) > -1) {
          //if matching skill, add to match list, score ++
          if (this.state.matches.indexOf(fakeData[j]) > -1)
            //if already has points
            this.state.scores[this.state.matches.indexOf(fakeData[j])] += 1;
          else {
            //else add to list of matches with new score
            this.state.matches[this.state.matches.length] = fakeData[j]
            this.state.scores[this.state.scores.length] = 1
          }
        }
    }



    for (i = 0; i < desiredProfessions.length; i++) {
      for (j = 0; j < fakeData.length; j += 3)
        if (fakeData[j + 1].indexOf(desiredProfessions[i]) > -1)
          //if matching skill, add to match list, score ++
          if (this.state.matches.indexOf(fakeData[j]) > -1)
            //if already has points
            this.state.scores[this.state.matches.indexOf(fakeData[j])] += 3;
          else {
            //else add to list of matches with new score
            this.state.matches[this.state.matches.length] = fakeData[j]
            this.state.scores[this.state.scores.length] = 3
          }
    }

    //sort by score
    for (i = 1; i < this.state.scores.length; i++) {
      for (j = 0; j < i; j++) {
        if (this.state.scores[i] > this.state.scores[j]) {
          x = this.state.scores[i];
          this.state.scores[i] = this.state.scores[j];
          this.state.scores[j] = x;
          y = this.state.matches[i];
          this.state.matches[i] = this.state.matches[j];
          this.state.matches[j] = y;
        }
      }
    }
  }//match function

  render() {
    //const { navigate } = this.props.navigation;

    //fakeData organized by iterations of (name, profession, skills);
    fakeData = [
      ['Daniel Ng'], ['Software Developer'], ['JQuery', 'Python', 'UX'], //should be number 4
      ['Tracy Lewis'], [''], ['UX', 'Prototyping'],//should be number 3
      ['Kevin Mui'], ['Product Manager'], [''], //should be number 2
      ['Lewis Tracy'], ['Product Manager'], ['UX'],//should be number 1
      ['Tone Yu'], ['Nurse'], ['Birthing', 'Yelling', 'Running'], //should not be in the results
    ];




    this.match(this.state.desiredSkills, this.state.desiredProfessions, fakeData);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <SectionList
              sections={[
                { title: 'Suggested Matches', data: this.state.matches },
                { title: 'Scores of Matches(temp)', data: this.state.scores }
              ]}
              renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
              renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
            />
          </View>
        </ScrollView>
      </View>
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
