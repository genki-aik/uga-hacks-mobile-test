import React from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import Styles from "./Styles";

export default function Schedule() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <Text>Schedule</Text>
      </SafeAreaView>
    </>
  );
}
