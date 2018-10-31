import React from "react";
import { Text } from "native-base";
import { ScrollView, StyleSheet, View, SectionList } from "react-native";

export default class MatchesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null
    };
  }

  render() {
    ////matching algo////

    const desiredSkills = ["Joking", "Smiling", "Yawning"]; //temp
    const desiredProfessions = ["Professor", "Tech Expert"]; //temp

    //fakeData organized by iterations of (name, profession, skills)
    const fakeData = [
      ["Rita Roloff"],
      ["Tech Expert"],
      ["Coding", "Slaying", "Singing"],
      ["Flower"],
      ["Tech Expert"],
      ["Coding", "Sending flowers", "Singing"],
      ["Obama"],
      ["POTUS"],
      ["Speaking", "Joking", "Dancing"],
      ["Tracey"],
      ["Professor"],
      ["Talking"],
      ["YO Mama"],
      ["Mother"],
      ["Birthing", "Yelling", "Running"],
      ["Dan"],
      ["Software Engineer"],
      ["Smiling", "Gaming"],
      ["Goku"],
      ["Super Saiyan"],
      ["Fighting", "Slaying", "Reviving"],
      ["My cat"],
      ["God", "Professor"],
      ["Sleeping", "Snoring", "Yawning"],
      ["R Federer"],
      ["GOAT"],
      ["Winning", "Slaying", "Tennis"]
    ];
    //array of matches with respective scores
    const matches = [];
    const scores = [];

    for (let i = 0; i < desiredSkills.length; i++) {
      for (let j = 0; j < fakeData.length; j += 3) {
        if (fakeData[j + 2].indexOf(desiredSkills[i]) > -1) {
          //if matching skill, add to match list, score ++
          if (matches.indexOf(fakeData[j]) > -1)
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 1;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 1;
          }
        }
      }
    }
    for (let i = 0; i < desiredProfessions.length; i++) {
      for (let j = 0; j < fakeData.length; j += 3)
        if (fakeData[j + 1].indexOf(desiredProfessions[i]) > -1) {
          //if matching skill, add to match list, score ++
          if (matches.indexOf(fakeData[j]) > -1)
            //if already has points
            scores[matches.indexOf(fakeData[j])] += 3;
          else {
            //else add to list of matches with new score
            matches[matches.length] = fakeData[j];
            scores[scores.length] = 3;
          }
        }
    }

    //sort by score
    for (let i = 1; i < scores.length; i++) {
      for (let j = 0; j < i; j++) {
        if (scores[i] > scores[j]) {
          let x = scores[i];
          scores[i] = scores[j];
          scores[j] = x;
          let y = matches[i];
          matches[i] = matches[j];
          matches[j] = y;
        }
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <SectionList
              sections={[
                { title: "Suggested Matches", data: matches },
                { title: "Scores of Matches(temp)", data: scores }
              ]}
              renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
              renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
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
  }
});
