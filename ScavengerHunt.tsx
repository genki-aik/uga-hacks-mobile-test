import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LogoTitle } from "./App";
import ClueQuestion from "./ClueQuestion";
import { RootStackParamList } from "./ScavengerHuntEnter";
import Styles from "./Styles";

export interface ScavengerHuntQuestions {
  clue1: string;
  clue2: string;
  clue3: string;
  clue4: string;
  clue5: string;
  clue1Answer: string;
  clue2Answer: string;
  clue3Answer: string;
  clue4Answer: string;
  clue5Answer: string;
}
// Use context for scavenger hunt path number
// Create component for displaying clue question
// Create component for displaying question
// Load answer from database and cache it

export default function ScavengerHunt() {
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const isFocused = useIsFocused();

  useEffect(() => {
    // Get the score and num questions answered
  }, [isFocused]);
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>Scavenger Hunt</Text>
            <Text style={{ color: "white", fontSize: 24 }}>
              {score}/200 points
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              marginTop: 15,
              marginBottom: 20,
              fontSize: 18,
              textAlign: "center",
            }}
          >
            The first question gives you a clue to where the password will be
            located in MLC! Once you find the password, it unlocks a question
            that you can answer to unlock the next clue!
          </Text>
          <View style={{ marginBottom: 15 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Clue", {
                  question: "Where do you get your boarding pass?",
                  answer: "Check-in",
                })
              }
            >
              <View style={Styles.scavenger_hunt_button}>
                <Text style={{ fontSize: 20, color: "black" }}>1st Clue</Text>
              </View>
            </TouchableOpacity>
          </View>
          {questionsAnswered >= 1 ? (
            <View style={{ marginBottom: 15 }}>
              <TouchableOpacity onPress={() => console.log("Pressed")}>
                <View style={Styles.scavenger_hunt_button}>
                  <Text style={{ fontSize: 20, color: "black" }}>2nd Clue</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
          {questionsAnswered >= 2 ? (
            <View style={{}}>
              <TouchableOpacity onPress={() => console.log("Pressed")}>
                <View style={Styles.scavenger_hunt_button}>
                  <Text style={{ fontSize: 20, color: "black" }}>3rd Clue</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
