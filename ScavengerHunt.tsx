import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ScavengerHuntAnswerType, useAuth } from "./context/AuthContext";
import { RootStackParamList } from "./ScavengerHuntEnter";
import { path1_clues } from "./path1";
import { main_questions } from "./main_question";
import Styles from "./Styles";

// Use context for scavenger hunt path number COMPLETE
// Create component for displaying clue question COMPLETE
// Create component for displaying question COMPLETE
// Load answer from database and cache it

export default function ScavengerHunt() {
  const { userInfo, scavengerHuntStatus, getScavengerHuntAnswers } = useAuth();
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [answers, setAnswers] = useState<ScavengerHuntAnswerType>({
    clue1_answer: "",
    clue2_answer: "",
    clue3_answer: "",
    clue4_answer: "",
    clue5_answer: "",
    clue6_answer: "",
    question1_answer: "",
    question2_answer: "",
    question3_answer: "",
    question4_answer: "",
    question5_answer: "",
    question6_answer: "",
  });

  //   const answers: ScavengerHuntAnswerType = useMemo(() => {
  //     console.log("Get answers");
  //     console.log(userInfo.scavenger_hunt_path_num);
  //     return getScavengerHuntAnswers(userInfo.scavenger_hunt_path_num);
  //   }, []);

  // Retrieve the answer only once
  useEffect(() => {
    async function getAnswers() {
      setAnswers(
        await getScavengerHuntAnswers(userInfo.scavenger_hunt_path_num)
      );
    }
    console.log("Use effect RUN");
    getAnswers();
  }, []);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function getQuestionNumberInfo(question_num: number) {
    switch (question_num) {
      case 1:
        return {
          clueAnswered: scavengerHuntStatus.clue1,
          clueQuestion: path1_clues.clue1,
          clueAnswer: answers.clue1_answer,
          question: main_questions.question1,
          answer: answers.question1_answer,
        };
      case 2:
        return {
          clueAnswered: scavengerHuntStatus.clue2,
          clueQuestion: path1_clues.clue2,
          clueAnswer: answers.clue2_answer,
          question: main_questions.question2,
          answer: answers.question2_answer,
        };
      case 3:
        return {
          clueAnswered: scavengerHuntStatus.clue3,
          clueQuestion: path1_clues.clue3,
          clueAnswer: answers.clue3_answer,
          question: main_questions.question3,
          answer: answers.question3_answer,
        };
      case 4:
        return {
          clueAnswered: scavengerHuntStatus.clue4,
          clueQuestion: path1_clues.clue4,
          clueAnswer: answers.clue4_answer,
          question: main_questions.question4,
          answer: answers.question4_answer,
        };
      case 5:
        return {
          clueAnswered: scavengerHuntStatus.clue5,
          clueQuestion: path1_clues.clue5,
          clueAnswer: answers.clue5_answer,
          question: main_questions.question5,
          answer: answers.question5_answer,
        };
      case 6:
        return {
          clueAnswered: scavengerHuntStatus.clue6,
          clueQuestion: path1_clues.clue6,
          clueAnswer: answers.clue6_answer,
          question: main_questions.question6,
          answer: answers.question6_answer,
        };
      default:
        return {
          clueAnswered: "",
          clueQuestion: "",
          clueAnswer: "",
          question: "",
          answer: "",
        };
    }
  }

  function onPress(question_num: number) {
    const questionNumberInfo = getQuestionNumberInfo(question_num);
    if (questionNumberInfo.clueAnswered) {
      navigation.navigate("Question", {
        question: questionNumberInfo.question,
        answer: questionNumberInfo.answer,
        question_num: question_num,
      });
    } else {
      navigation.navigate("Clue", {
        clue: questionNumberInfo.clueQuestion,
        clueAnswer: questionNumberInfo.clueAnswer,
        nextQuestion: questionNumberInfo.question,
        nextAnswer: questionNumberInfo.answer,
        clue_num: question_num,
      });
    }
  }
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("Use effect scavenger hunt status");
    if (scavengerHuntStatus.completed) {
      setScore(1000);
    }
  }, [scavengerHuntStatus]);
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
              {score}/1000 points
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
          {!scavengerHuntStatus.question1 ? (
            <View style={{ marginBottom: 15 }}>
              <TouchableOpacity onPress={() => onPress(1)}>
                <View style={Styles.scavenger_hunt_button}>
                  <Text style={{ fontSize: 20, color: "black" }}>1st Clue</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginBottom: 15 }}>
              <TouchableOpacity disabled={true}>
                <View style={Styles.scavenger_hunt_button_disabled}>
                  <Text style={{ fontSize: 20, color: "black" }}>1st Clue</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {scavengerHuntStatus.numQuestionsAnswered >= 1 ? (
            !scavengerHuntStatus.question2 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(2)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      2nd Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      2nd Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
          {scavengerHuntStatus.numQuestionsAnswered >= 2 ? (
            !scavengerHuntStatus.question3 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(3)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      3rd Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      3rd Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
          {scavengerHuntStatus.numQuestionsAnswered >= 3 ? (
            !scavengerHuntStatus.question4 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(4)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      4th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      4th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
          {scavengerHuntStatus.numQuestionsAnswered >= 4 ? (
            !scavengerHuntStatus.question5 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(5)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      5th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      5th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
          {scavengerHuntStatus.numQuestionsAnswered >= 5 ? (
            !scavengerHuntStatus.question6 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(6)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      6th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      6th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
