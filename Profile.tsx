import React, { FC, ReactElement, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useAuth } from "./context/AuthContext";
import QRCode from "react-native-qrcode-svg";

export const HelloUser: FC<{}> = ({}): ReactElement => {
  const { user, userInfo, getPoints, changedPoints, setChangedPoints, points } =
    useAuth();
  // State variable that will hold username value
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const hacks8Logo = require("./assets/byte_mini.png");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user_points = await getPoints(user.uid);
  //     if (user_points < 0) {
  //       setLoading(true);
  //     } else {
  //       setLoading(false);
  //     }
  //     setPoints(user_points);
  //   };
  //   console.log("Fetching points");
  //   fetchData();
  // }, []);

  useEffect(() => {
    console.log("Points changed");
    if (changedPoints) {
      getPoints(user.uid);
      setChangedPoints(false);
    }
  }, [changedPoints]);

  return (
    <>
      <View style={{ flex: 3, alignItems: "center" }}>
        {userInfo.uid ? (
          <>
            <Text style={{ fontSize: 36, color: "white" }}>
              You have {points} points!
            </Text>
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
          </>
        ) : null}
      </View>
    </>
  );
};
