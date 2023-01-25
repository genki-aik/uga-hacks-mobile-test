import React, { FC, ReactElement, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import Parse from 'parse/react-native';
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";
import { useAuth } from "./context/AuthContext";

export const UserLogIn: FC<{}> = ({}): ReactElement => {
  const { logIn, logInWithGoogle } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInWithEmail = async () => {
    try {
      const success = await logIn(email, password);
      alert(success);
    } catch (error: any) {
      alert(error);
    }
  };

  const googleLogin = async () => {
    try {
      await logInWithGoogle();
    } catch (error: any) {
      alert(error);
    }
  };

  //   const doUserLogIn = async function (): Promise<boolean> {
  //     // Note that this values come from state variables that we've declared before
  //     const usernameValue: string = username;
  //     const passwordValue: string = password;
  //     return await Parse.User.logIn(usernameValue, passwordValue)
  //       .then(async (loggedInUser: Parse.User) => {
  //         // logIn returns the corresponding ParseUser object
  //         Alert.alert(
  //           'Success!',
  //           `User ${loggedInUser.get('username')} has successfully signed in!`,
  //         );
  //         // To verify that this is in fact the current user, currentAsync can be used
  //         const currentUser: Parse.User = await Parse.User.currentAsync();
  //         console.log(loggedInUser === currentUser);
  //         // Navigation.navigate takes the user to the screen named after the one
  //         // passed as parameter
  //         navigation.navigate('Home');
  //         return true;
  //       })
  //       .catch((error: object) => {
  //         // Error can be caused by wrong parameters or lack of Internet connection
  //         Alert.alert('Error!', error.message);
  //         return false;
  //       });
  //   };

  return (
    <ScrollView>
      <View style={Styles.login_wrapper}>
        <View style={Styles.form}>
          <TextInput
            style={Styles.form_input}
            value={email}
            placeholder={"Email"}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />
          <TextInput
            style={Styles.form_input}
            value={password}
            placeholder={"Password"}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={logInWithEmail}>
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{"Sign in"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={Styles.login_social}>
          <View style={Styles.login_social_separator}>
            <View style={Styles.login_social_separator_line} />
            <Text style={Styles.login_social_separator_text}>{"or"}</Text>
            <View style={Styles.login_social_separator_line} />
          </View>
          <View style={Styles.login_social_buttons}>
            <TouchableOpacity onPress={googleLogin}>
              <View style={Styles.login_social_button}>
                <Image
                  style={Styles.login_social_icon}
                  source={require("./assets/icon-google.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign Up" as never)}
          >
            <Text style={Styles.login_footer_text}>
              {"Don't have an account? "}
              <Text style={Styles.login_footer_link}>{"Sign up"}</Text>
            </Text>
          </TouchableOpacity>
        </>
      </View>
    </ScrollView>
  );
};
