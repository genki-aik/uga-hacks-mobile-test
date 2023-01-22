import React from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import Styles from "./Styles";

export default function ScavengerHunt() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <Text>Scavenger Hunt</Text>
      </SafeAreaView>
    </>
  );
}
