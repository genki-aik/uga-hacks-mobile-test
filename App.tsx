/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler";
import React from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Parse from 'parse/react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserRegistration } from "./UserRegistration";
import { UserLogIn } from "./UserLogIn";
import { UserLogOut } from "./UserLogOut";
import { HelloUser } from "./HelloUser";
import Styles from "./Styles";
import { AuthContextProvider } from "./context/AuthContext";

// // Your Parse initialization configuration goes here
// Parse.setAsyncStorage(AsyncStorage);
// const PARSE_APPLICATION_ID: string = 'YOUR_PARSE_APPLICATION_ID';
// const PARSE_HOST_URL: string = 'YOUR_PARSE_HOST_URL';
// const PARSE_JAVASCRIPT_ID: string = 'YOUR_PARSE_JAVASCRIPT_ID';
// Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_ID);
// Parse.serverURL = PARSE_HOST_URL;

// Wrap your old app screen in a separate function, so you can create a screen inside the navigator
// You can also declare your screens in a separate file, export and import here to reduce some clutter
function UserRegistrationScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image style={Styles.login_header_logo} />
          <Text style={Styles.login_header_text}>
            <Text style={Styles.login_header_text_bold}>
              {"React Native on Back4App - "}
            </Text>
            {" User registration"}
          </Text>
        </View>
        <UserRegistration />
      </SafeAreaView>
    </>
  );
}

function UserLogInScreen() {
  return (
    <AuthContextProvider>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image style={Styles.login_header_logo} />
          <Text style={Styles.login_header_text}>
            <Text style={Styles.login_header_text_bold}>
              {"React Native on Back4App - "}
            </Text>
            {" User login"}
          </Text>
        </View>
        <UserLogIn />
      </SafeAreaView>
    </AuthContextProvider>
  );
}

function LogoTitle() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 30, height: 30 }}
        source={require("./assets/UGAHacks_General_Byte.png")}
      />
      <Text style={{ color: "white", padding: 5, fontSize: 22 }}>
        UGA Hacks ByteMobile
      </Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <AuthContextProvider>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image
            style={Styles.login_header_logo}
            source={require("./assets/icon-google.png")}
          />
          <Text style={Styles.login_header_text}>
            <Text style={Styles.login_header_text_bold}>
              {"React Native on Back4App - "}
            </Text>
            {" Home"}
          </Text>
        </View>
        <HelloUser />
        <UserLogOut />
      </SafeAreaView>
    </AuthContextProvider>
  );
}

// This method instantiates and creates a new StackNavigator
const Stack = createStackNavigator();

// Add the stack navigator and inside it you can insert all your app screens, in the desired order
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#DC4141",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={UserLogInScreen}
          options={{ headerTitle: () => <LogoTitle /> }}
        />
        <Stack.Screen
          name="Sign Up"
          component={UserRegistrationScreen}
          options={{ headerTitle: () => <LogoTitle /> }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
