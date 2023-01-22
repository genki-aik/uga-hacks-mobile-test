import React, { FC, ReactElement, useEffect, useState } from "react";
import { Text, View } from "react-native";
//import Parse from 'parse/react-native';
import Styles from "./Styles";
import { useAuth } from "./context/AuthContext";

export const HelloUser: FC<{}> = ({}): ReactElement => {
  const { user, userInfo, getPoints } = useAuth();
  // State variable that will hold username value
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const curr_points = getPoints(user.uid);
    console.log("LOGGING");
    console.log(user);
    console.log(userInfo);
    console.log(curr_points);
    setPoints(curr_points);
  }, []);

  // useEffect is called after the component is initially rendered and
  // after every other render
  //   useEffect(() => {
  //     // Since the async method Parse.User.currentAsync is needed to
  //     // retrieve the current user data, you need to declare an async
  //     // function here and call it afterwards
  //     async function getCurrentUser() {
  //       // This condition ensures that username is updated only if needed
  //       if (username === '') {
  //         const currentUser = await Parse.User.currentAsync();
  //         if (currentUser !== null) {
  //           setUsername(currentUser.getUsername());
  //         }
  //       }
  //     }
  //     getCurrentUser();
  //   }, [username]);

  // Note the conditional operator here, so the "Hello" text is only
  // rendered if there is an username value
  return (
    <>
      <View style={{ flex: 3, alignItems: "center" }}>
        <Text style={{ fontSize: 36 }}>You have {points}</Text>
      </View>
    </>
  );
};
