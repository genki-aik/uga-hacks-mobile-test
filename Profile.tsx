import React, { FC, ReactElement, useEffect, useState } from "react";
import { Text, View } from "react-native";
//import Parse from 'parse/react-native';
import Styles from "./Styles";
import { useAuth } from "./context/AuthContext";
import QRCode from "react-native-qrcode-svg";

export const HelloUser: FC<{}> = ({}): ReactElement => {
  const { user, userInfo, getPoints } = useAuth();
  // State variable that will hold username value
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const hacks8Logo = require("./assets/byte_mini.png");

  useEffect(() => {
    const fetchData = async () => {
      console.log("FETCH DATA)");
      console.log(user.uid);
      //console.log(userInfo.uid);
      const user_points = await getPoints(user.uid);
      if (user_points < 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
      setPoints(user_points);
    };
    console.log("LOGGING");
    fetchData();

    console.log(user);
    console.log(userInfo);
  }, [user, userInfo]);
  console.log("OUTSIDE");
  console.log(userInfo);

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
        {!loading ? (
          <Text style={{ fontSize: 36, color: "white" }}>
            You have {points} points!
          </Text>
        ) : null}
        {userInfo.uid ? (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ marginBottom: 15, fontSize: 18, color: "white" }}>
              Use this QR code to check-in to events! 🐶
            </Text>
            <QRCode
              size={200}
              value={userInfo.uid}
              logo={hacks8Logo}
              logoBackgroundColor="black"
            />
          </View>
        ) : null}
      </View>
    </>
  );
};
