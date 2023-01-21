import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

export interface UserType {
  email: string | null;
  uid: string | null;
}

interface EventRegistered {
  HACKS8: boolean | null;
}

export interface UserInfoType {
  first_name: string | null;
  last_name: string | null;
  points: number;
  registered: EventRegistered;
  //user_type: Users | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    first_name: null,
    last_name: null,
    points: 0,
    registered: {
      HACKS8: null,
    },
    //user_type: null
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Stage Environment
  const userRefStage = collection(db, "users-stage");
  const eSportsRefStage = collection(db, "user-e-sports-details-stage");
  const registerRefStage = collection(db, "user-registration-details-stage");
  const workshopRefStage = collection(db, "user-workshop-details-stage");

  // Prod Environment
  const userRef = collection(db, "users");
  const eSportsRef = collection(db, "user-e-sports-details");
  const registerRef = collection(db, "user-registration-details");
  const workshopRef = collection(db, "user-workshop-details");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curr_user) => {
      if (curr_user) {
        setUser({
          email: curr_user.email,
          uid: curr_user.uid,
        });
        setUserInformation(curr_user.uid);
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const googleProvider = new GoogleAuthProvider();

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
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const user = res.user;
      const name = first_name + " " + last_name;

      await setDoc(doc(userRef, user.uid), {
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
      sendEmailVerification(user);
      signOut(auth);
    } catch (err: any) {
      throw err;
    }
  };

  const logIn = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    if (!user.emailVerified) {
      setUser({ uid: null, email: null });
      signOut(auth);
      return false;
    }

    return true;
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const google_user = res.user;
      // const q = query(collection(db, "users"), where("uid", "==", user.uid));
      // const docs = await getDocs(q);

      const docRef = doc(userRef, google_user.uid);
      const docSnap = await getDoc(docRef);

      const [first_name, last_name] = getFirstAndLastNameFromGoogleName(
        google_user.displayName
      );

      if (!docSnap.exists()) {
        await setDoc(doc(userRef, google_user.uid), {
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

  const storeFirstAndLastName = async (
    first_name: string,
    last_name: string
  ) => {
    try {
      const docRef = doc(userRef, user.uid ? user.uid : "");

      await updateDoc(docRef, {
        first_name: first_name,
        last_name: last_name,
      });
      setUserInformation(user.uid);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getFirstName = async () => {
    const docRef = doc(userRef, user.uid ? user.uid : "0");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data().first_name;
  };

  const getRegisteredEvents = async () => {
    const docRef = doc(userRef, user.uid ? user.uid : "0");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data().registered;
  };

  const setUserInformation = async (uid: string | null) => {
    const docRef = doc(userRef, uid ? uid : "");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    setUserInfo({
      first_name: docSnap.data().first_name,
      last_name: docSnap.data().last_name,
      points: docSnap.data().points,
      registered: docSnap.data().registered,
      //user_type: docSnap.data().user_type,
    });
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
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
        storeFirstAndLastName,
        validUser,
        getFirstName,
        getRegisteredEvents,
        setUserInformation,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
