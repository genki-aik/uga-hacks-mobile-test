import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   sendEmailVerification,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import {
//   doc,
//   setDoc,
//   collection,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { serverTimestamp } from "firebase/firestore";

export interface UserType {
  email: string | null;
  uid: string | null;
}

interface EventRegistered {
  HACKS8: boolean | null;
}

export interface UserInfoType {
  uid: string | null;
  first_name: string | null;
  last_name: string | null;
  points: number | null;
  registered: EventRegistered | null;
  //user_type: Users | null;
}

export const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    uid: null,
    first_name: null,
    last_name: null,
    points: null,
    registered: null,
    //user_type: null
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Stage Environment
  // const userRefStage = collection(db, "users-stage");
  // const eSportsRefStage = collection(db, "user-e-sports-details-stage");
  // const registerRefStage = collection(db, "user-registration-details-stage");
  // const workshopRefStage = collection(db, "user-workshop-details-stage");

  // // Prod Environment
  // const userRef = collection(db, "users");
  // const eSportsRef = collection(db, "user-e-sports-details");
  // const registerRef = collection(db, "user-registration-details");
  // const workshopRef = collection(db, "user-workshop-details");

  // function onAuthStateChanged(user: React.SetStateAction<UserType>) {
  //   setUser(user);
  // }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((curr_user) => {
      console.log(curr_user);
      if (curr_user) {
        setUser({
          email: curr_user.email,
          uid: curr_user.uid,
        });
        setUserInformation(curr_user.uid);
      } else {
        setUser({ email: null, uid: null });
        resetUserInformation();
      }
    });
    setLoading(false);
    console.log("context");
    console.log(user);

    return () => unsubscribe();
  }, []);

  //const googleProvider = new GoogleAuthProvider();

  const validUser = () => {
    if (user) {
      return true;
    }

    return false;
  };

  function getFirstAndLastNameFromGoogleName(
    full_name: string | null
  ): [string, string] {
    // if name does not exist
    if (!full_name) {
      return ["", ""];
    }

    let first_name, last_name, rest;
    [first_name, last_name, ...rest] = full_name.split(" ");

    return [first_name, last_name];
  }

  const signUp = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);

      const user = res.user;
      const name = first_name + " " + last_name;

      await firestore().collection("users").doc(user.uid).set({
        uid: user.uid,
        first_name: first_name,
        last_name: last_name,
        name: name,
        authProvider: "local",
        email: email,
        points: 0,
        registered: {},
        added_time: serverTimestamp(),
      });
      user.sendEmailVerification();
      auth().signOut();
    } catch (err: any) {
      throw err;
    }
  };

  const logIn = async (email: string, password: string) => {
    const res = await auth().signInWithEmailAndPassword(email, password);
    const user = res.user;

    if (!user.emailVerified) {
      setUser({ uid: null, email: null });
      resetUserInformation();
      auth().signOut();
      return false;
    }

    return true;
  };

  const resetPassword = async (email: string) => {
    await auth().sendPasswordResetEmail(email);
  };

  const logInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get user id token
      const { idToken } = await GoogleSignin.signIn();

      // Create a google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in the user with the credential
      const res = await auth().signInWithCredential(googleCredential);

      //const res = await signInWithPopup(auth, googleProvider);
      const google_user = res.user;

      // const q = query(collection(db, "users"), where("uid", "==", user.uid));
      // const docs = await getDocs(q);

      // const docRef = doc(userRef, google_user.uid);
      // const docSnap = await getDoc(docRef);
      console.log(google_user.uid);
      const docSnap = await firestore()
        .collection("users")
        .doc(google_user.uid)
        .get();

      const [first_name, last_name] = getFirstAndLastNameFromGoogleName(
        google_user.displayName
      );

      if (!docSnap.exists) {
        await firestore().collection("users").doc(google_user.uid).set({
          uid: google_user.uid,
          first_name: first_name,
          last_name: last_name,
          name: google_user.displayName,
          authProvider: "google",
          email: google_user.email,
          points: 0,
          registered: {},
          added_time: serverTimestamp(),
        });
      }
      setUserInformation(google_user.uid);
    } catch (err: any) {
      console.error(err);
    }
  };

  // const storeFirstAndLastName = async (
  //   first_name: string,
  //   last_name: string
  // ) => {
  //   try {
  //     const docRef = doc(userRef, user.uid ? user.uid : "");

  //     await updateDoc(docRef, {
  //       first_name: first_name,
  //       last_name: last_name,
  //     });
  //     setUserInformation(user.uid);
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };

  // const getFirstName = async () => {
  //   const docRef = doc(userRef, user.uid ? user.uid : "0");
  //   const docSnap = await getDoc(docRef);

  //   if (!docSnap.exists()) {
  //     return null;
  //   }

  //   return docSnap.data().first_name;
  // };

  // const getRegisteredEvents = async () => {
  //   const docRef = doc(userRef, user.uid ? user.uid : "0");
  //   const docSnap = await getDoc(docRef);

  //   if (!docSnap.exists()) {
  //     return null;
  //   }

  //   return docSnap.data().registered;
  // };

  const setUserInformation = async (uid: string | null) => {
    // const docRef = doc(userRef, uid ? uid : "");
    // const docSnap = await getDoc(docRef);
    console.log("SETTING USER INFORMATION");
    console.log(uid);
    const docSnap = await firestore()
      .collection("users")
      .doc(uid ? uid : "")
      .get();
    console.log(docSnap);
    if (!docSnap.exists) {
      return null;
    }

    setUserInfo({
      uid: docSnap.data()?.uid,
      first_name: docSnap.data()?.first_name,
      last_name: docSnap.data()?.last_name,
      points: docSnap.data()?.points,
      registered: docSnap.data()?.registered,
      //user_type: docSnap.data().user_type,
    });
    console.log(userInfo);
  };

  const resetUserInformation = () => {
    setUserInfo({
      uid: null,
      first_name: null,
      last_name: null,
      points: null,
      registered: null,
    });
  };

  const getPoints = async (uid: string | null) => {
    console.log("Get points");
    console.log(uid);

    if (!uid) {
      return -1;
    }
    const docSnap = await firestore()
      .collection("users")
      .doc(uid ? uid : "")
      .get();

    console.log("Retreieved data");
    console.log(docSnap);
    if (!docSnap.exists) {
      return null;
    }

    return docSnap.data()?.points;
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    resetUserInformation();
    await auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        signUp,
        logIn,
        resetPassword,
        logInWithGoogle,
        logOut,
        validUser,
        setUserInformation,
        getPoints,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
