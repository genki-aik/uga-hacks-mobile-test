/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
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
import {
  useAuth,
  AuthContextProvider,
  AuthContext,
} from "./context/AuthContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
          <Text style={Styles.login_header_text_bold}>
            {"User Registration"}
          </Text>
        </View>
        <UserRegistration />
      </SafeAreaView>
    </>
  );
}

function UserLogInScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image style={Styles.login_header_logo} />
          <Text style={Styles.login_header_text_bold}>{"User Login"}</Text>
        </View>
        <UserLogIn />
      </SafeAreaView>
    </>
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
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 40, height: 40, marginTop: 10 }}
            source={require("./assets/byte_mini.png")}
          />
          <Text style={{ color: "black", padding: 5, fontSize: 32 }}>
            UGA Hacks 8
          </Text>
        </View>
        <HelloUser />
        <UserLogOut />
      </SafeAreaView>
    </>
  );
}

// This method instantiates and creates a new StackNavigator
const Stack = createStackNavigator();

// Add the stack navigator and inside it you can insert all your app screens, in the desired order
const App = () => {
  GoogleSignin.configure({
    webClientId:
      "804445792649-cj3r1i3kqv93omm9sfrh4be61d76h173.apps.googleusercontent.com",
  });

  // const { user } = useAuth();

  // useEffect(() => {
  //   console.log("USE effect");
  //   console.log(user);
  // }, [user]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContextProvider>
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
          {!user ? (
            <>
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
            </>
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerTitle: () => <LogoTitle /> }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
