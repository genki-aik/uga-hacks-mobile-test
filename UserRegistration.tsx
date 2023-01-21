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

export const UserRegistration: FC<{}> = ({}): ReactElement => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   const doUserSignUp = async function (): Promise<boolean> {
  //     // Note that this values come from state variables that we've declared before
  //     const usernameValue: string = username;
  //     const passwordValue: string = password;
  //     // Since the signUp method returns a Promise, we need to call it using await
  // //     return await Parse.User.signUp(usernameValue, passwordValue)
  // //       .then((createdUser: Parse.User) => {
  // //         // Parse.User.signUp returns the already created ParseUser object if successful
  // //         Alert.alert(
  // //           'Success!',
  // //           `User ${createdUser.get('username')} was successfully created!`,
  // //         );
  // //         // Navigation.navigate takes the user to the screen named after the one
  // //         // passed as parameter
  // //         navigation.navigate('Home');
  // //         return true;
  // //       })
  // //       .catch((error: object) => {
  // //         // signUp can fail if any parameter is blank or failed an uniqueness check on the server
  // //         Alert.alert('Error!', error.message);
  // //         return false;
  // //       });
  // //   };

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
            value={firstName}
            placeholder={"First Name"}
            onChangeText={(text) => setFirstName(text)}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />
          <TextInput
            style={Styles.form_input}
            value={lastName}
            placeholder={"Last Name"}
            onChangeText={(text) => setLastName(text)}
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
          <TextInput
            style={Styles.form_input}
            value={confirmPassword}
            placeholder={"Confirm Password"}
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity onPress={() => alert("Pressed button")}>
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{"Sign Up"}</Text>
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
            <TouchableOpacity>
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
            onPress={() => navigation.navigate("Login" as never)}
          >
            <Text style={Styles.login_footer_text}>
              {"Already have an account? "}
              <Text style={Styles.login_footer_link}>{"Log In"}</Text>
            </Text>
          </TouchableOpacity>
        </>
      </View>
    </ScrollView>
  );
};
