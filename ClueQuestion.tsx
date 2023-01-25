import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Styles from "./Styles";
import { RootStackParamList } from "./ScavengerHuntEnter";
import { StackScreenProps } from "@react-navigation/stack";
import { showMessage } from "react-native-flash-message";

type Props = StackScreenProps<RootStackParamList, "Clue">;

export default function ClueQuestion({ route, navigation }: Props) {
  const [userInput, setUserInput] = useState("");
  const { question, answer } = route.params;

  const onPress = function onPress() {
    if (userInput === answer) {
      showMessage({
        message: "Correct!",
        type: "success",
        color: "white",
        titleStyle: { textAlign: "center", fontSize: 19 },
      });
      navigation.navigate("Question", {
        question: "What is the first high-level programming language?",
        answer: "FORTRAN",
      });
    } else {
      showMessage({
        message: "Incorrect Answer!",
        type: "warning",
        color: "black",
        titleStyle: { textAlign: "center", fontSize: 19 },
      });
      setUserInput("");
    }
  };
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <ScrollView>
          <View style={{ marginTop: 15 }}>
            <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
              Clue:
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
            {question}
          </Text>
          <TextInput
            style={Styles.clue_submit_button}
            value={userInput}
            placeholder={"Password"}
            onChangeText={(text) => setUserInput(text)}
          />
          <TouchableOpacity
            style={{ marginLeft: 20, marginRight: 20 }}
            onPress={onPress}
          >
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{"Submit"}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
