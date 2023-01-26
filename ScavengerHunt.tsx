import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
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
import { path2_clues } from "./path2";
import { path3_clues } from "./path3";
import { path4_clues } from "./path4";
import { path5_clues } from "./path5";
import { main_questions } from "./main_question";
import Styles from "./Styles";

export default function ScavengerHunt() {
  interface ScavengerHuntClueType {
    clue1: string;
    clue2: string;
    clue3: string;
    clue4: string;
    clue5: string;
    clue6: string;
  }
  const { userInfo, scavengerHuntStatus, getScavengerHuntAnswers } = useAuth();
  const [score, setScore] = useState(0);
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
  const [clues, setClues] = useState<ScavengerHuntClueType>({
    clue1: "",
    clue2: "",
    clue3: "",
    clue4: "",
    clue5: "",
    clue6: "",
  });

  function getCluesHelper(clues: ScavengerHuntClueType) {
    setClues({
      clue1: clues.clue1,
      clue2: clues.clue2,
      clue3: clues.clue3,
      clue4: clues.clue4,
      clue5: clues.clue5,
      clue6: clues.clue6,
    });
  }

  // Retrieve the answer only once
  useEffect(() => {
    async function getAnswers() {
      setAnswers(
        await getScavengerHuntAnswers(userInfo.scavenger_hunt_path_num)
      );
    }

    function getClues() {
      switch (userInfo.scavenger_hunt_path_num) {
        case 1:
          getCluesHelper(path1_clues);
          return;
        case 2:
          getCluesHelper(path2_clues);
          return;
        case 3:
          getCluesHelper(path3_clues);
          return;
        case 4:
          getCluesHelper(path4_clues);
          return;
        case 5:
          getCluesHelper(path5_clues);
          return;
        default:
          return;
      }
    }
    getClues();
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

  useEffect(() => {
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
