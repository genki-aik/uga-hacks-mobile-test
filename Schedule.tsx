import React from "react";
import { View, Text, StatusBar, SafeAreaView, ScrollView } from "react-native";
import CalendarBlock from "./components/CalendarBlock";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// @ts-ignore
import { Card } from "react-native-shadow-cards";
import { fridaySchedule } from "./hacks8Schedule";
import Styles from "./Styles";

export enum EventTag {
  IMPORTANT = "important",
  WORKSHOP = "workshop",
  SIDE_EVENT = "side event",
  GAME = "game",
  FOOD = "food",
  COMPANY_EVENT = "company event",
  SUBMISSION_EXPO = "submission expo",
  CEREMONY = "ceremony",
}

export interface Event {
  name: string;
  startTime: string;
  endTime: string;
  tag: EventTag;
  location: string;
  description: string;
}

function eventTagColor(tag: EventTag) {
  switch (tag) {
    case EventTag.CEREMONY:
      return "#FFA500"; // Orange
    case EventTag.COMPANY_EVENT:
      return "#FF00FF"; // Magenta
    case EventTag.FOOD:
      return "#00FFFF"; // Cyan
    case EventTag.GAME:
      return "#FFFF00"; // Yellow
    case EventTag.IMPORTANT:
      return "#DC4141"; // UGA Red
    case EventTag.SIDE_EVENT:
      return "#00FF00"; // Lime
    case EventTag.SUBMISSION_EXPO:
      return "#7FFFD4"; // Aquamarine
    case EventTag.WORKSHOP:
      return "#FF0000"; // Red
    default:
      return "white";
  }
}

// const fridaySchedule = new Map<string, Event[]>([
//   [
//     "5:00 PM",
//     [
//       {
//         name: "Check-In",
//         startTime: "5:00 PM",
//         endTime: "6:30 PM",
//         tag: EventTag.IMPORTANT,
//         location: "MLC",
//         description: "Check in to UGA Hacks 8",
//       },
//     ],
//   ],
// ]);

function FridaySchedule() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <ScrollView>
          {fridaySchedule.map((events, index) => {
            return (
              <View key={index}>
                <View>
                  <Text style={{ padding: 5, fontSize: 20, color: "white" }}>
                    {events.start}
                  </Text>
                </View>
                {events.eventList.map((event, index) => {
                  return (
                    <View key={index}>
                      <Card
                        style={{
                          marginLeft: 15,
                          marginBottom: 15,
                          marginRight: 15,
                          padding: 10,
                          backgroundColor: "#212124",
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>
                          {event.name}
                        </Text>
                        <Text style={{ color: "#818181", fontSize: 16 }}>
                          {event.location}
                        </Text>
                        <Text style={{ color: "#818181", fontSize: 16 }}>
                          {event.startTime} - {event.endTime}
                        </Text>
                        <Text style={{ color: eventTagColor(event.tag) }}>
                          {event.tag}
                        </Text>
                      </Card>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function SaturdaySchedule() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View>
          <Text>Saturday</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

function SundaySchedule() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View>
          <Text>Sunday</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default function ScheduleScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen name="Friday" component={FridaySchedule} />
      <Tab.Screen name="Saturday" component={SaturdaySchedule} />
      <Tab.Screen name="Sunday" component={SundaySchedule} />
    </Tab.Navigator>
  );
}
