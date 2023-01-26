import React, { createContext, useContext, useEffect, useState } from "react";
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
  scavenger_hunt_path_num: number | null;
  //user_type: Users | null;
}

export interface ScavengerHuntStatusType {
  clue1: boolean;
  clue2: boolean;
  clue3: boolean;
  clue4: boolean;
  clue5: boolean;
  clue6: boolean;
  question1: boolean;
  question2: boolean;
  question3: boolean;
  question4: boolean;
  question5: boolean;
  question6: boolean;
  numQuestionsAnswered: number;
  completed: boolean;
}

export interface ScavengerHuntAnswerType {
  clue1_answer: string;
  clue2_answer: string;
  clue3_answer: string;
  clue4_answer: string;
  clue5_answer: string;
  clue6_answer: string;
  question1_answer: string;
  question2_answer: string;
  question3_answer: string;
  question4_answer: string;
  question5_answer: string;
  question6_answer: string;
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
    scavenger_hunt_path_num: null,
    //user_type: null
  });
  const [scavengerHuntStatus, setScavengerHuntStatus] =
    useState<ScavengerHuntStatusType>({
      clue1: false,
      clue2: false,
      clue3: false,
      clue4: false,
      clue5: false,
      clue6: false,
      question1: false,
      question2: false,
      question3: false,
      question4: false,
      question5: false,
      question6: false,
      numQuestionsAnswered: 0,
      completed: false,
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

    return () => unsubscribe();
  }, []);

  const validUser = () => {
    if (user) {
      return true;
    }

    return false;
  };

  function generateScavengerHuntGroup() {
    const min = Math.ceil(1);
    const max = Math.floor(5);

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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

  async function createScavengerHuntDocument(uid: string) {
    // Check if scavenger hunt users exist
    const docSnapScavengerHunt = await firestore()
      .collection("scavenger-hunt-users")
      .doc(uid)
      .get();

    // Create new document for scavenger hunt if it does not exist
    if (!docSnapScavengerHunt.exists) {
      await firestore().collection("scavenger-hunt-users").doc(uid).set({
        uid: uid,
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        clue1: false,
        clue2: false,
        clue3: false,
        clue4: false,
        clue5: false,
        clue6: false,
        completed: false,
        numQuestionsAnswered: 0,
      });
    }
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
      const scavenger_hunt_group = generateScavengerHuntGroup();

      await firestore().collection("users").doc(user.uid).set({
        uid: user.uid,
        first_name: first_name,
        last_name: last_name,
        name: name,
        authProvider: "local",
        email: email,
        points: 0,
        registered: {},
        scavenger_hunt_group: scavenger_hunt_group,
        added_time: serverTimestamp(),
      });
      await createScavengerHuntDocument(user.uid);

      user.sendEmailVerification();
      auth().signOut();
    } catch (err: any) {
      throw err;
    }
  };

  const logIn = async (email: string, password: string) => {
    const res = await auth().signInWithEmailAndPassword(email, password);
    const user = res.user;
    const docSnap = await firestore().collection("users").doc(user.uid).get();
    const scavenger_hunt_group = generateScavengerHuntGroup();

    if (!user.emailVerified) {
      setUser({ uid: null, email: null });
      resetUserInformation();
      auth().signOut();
      return false;
    }

    if (docSnap.data()?.scavenger_hunt_group == null) {
      await firestore().collection("users").doc(user.uid).update({
        scavenger_hunt_group: scavenger_hunt_group,
      });
    }

    await createScavengerHuntDocument(user.uid);

    setUserInformation(user.uid);
    setScavengerHuntInformation(user.uid);

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

      const google_user = res.user;

      const docSnap = await firestore()
        .collection("users")
        .doc(google_user.uid)
        .get();

      const [first_name, last_name] = getFirstAndLastNameFromGoogleName(
        google_user.displayName
      );

      const scavenger_hunt_group = generateScavengerHuntGroup();

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
          scavenger_hunt_group: scavenger_hunt_group,
          added_time: serverTimestamp(),
        });
      } else {
        // Check if scavenger hunt group exists because it was added later
        if (docSnap.data()?.scavenger_hunt_group == null) {
          await firestore().collection("users").doc(google_user.uid).update({
            scavenger_hunt_group: scavenger_hunt_group,
          });
        }
      }

      // Check if scavenger hunt users exist
      await createScavengerHuntDocument(google_user.uid);

      setUserInformation(google_user.uid);
      setScavengerHuntInformation(google_user.uid);
    } catch (err: any) {
      console.error(err);
    }
  };

  const updateQuestionScavengerHuntStatus = async (
    question_answered: string,
    uid: string,
    num_questions_answered: number,
    curr_points: number
  ) => {
    if (num_questions_answered === 6) {
      await firestore()
        .collection("scavenger-hunt-users")
        .doc(uid)
        .update({
          [question_answered]: true,
          numQuestionsAnswered: num_questions_answered,
          completed: true,
        });

      // Update user points
      await firestore()
        .collection("users")
        .doc(uid)
        .update({
          points: 1000 + curr_points,
        });
    } else {
      await firestore()
        .collection("scavenger-hunt-users")
        .doc(uid)
        .update({
          [question_answered]: true,
          numQuestionsAnswered: num_questions_answered,
        });
    }
    setScavengerHuntInformation(uid);
    setUserInformation(uid);
  };

  const updateClueScavengerHuntStatus = async (
    clue_answered: string,
    uid: string
  ) => {
    console.log(uid);
    console.log(clue_answered);
    await firestore()
      .collection("scavenger-hunt-users")
      .doc(uid)
      .update({
        [clue_answered]: true,
        test: true,
      });

    setScavengerHuntInformation(uid);
  };

  const setUserInformation = async (uid: string | null) => {
    const docSnap = await firestore()
      .collection("users")
      .doc(uid ? uid : "")
      .get();

    if (!docSnap.exists) {
      return null;
    }

    setUserInfo({
      uid: docSnap.data()?.uid,
      first_name: docSnap.data()?.first_name,
      last_name: docSnap.data()?.last_name,
      points: docSnap.data()?.points,
      registered: docSnap.data()?.registered,
      scavenger_hunt_path_num: docSnap.data()?.scavenger_hunt_group,
      //user_type: docSnap.data().user_type,
    });
  };

  const setScavengerHuntInformation = async (uid: string) => {
    const docSnap = await firestore()
      .collection("scavenger-hunt-users")
      .doc(uid)
      .get();

    setScavengerHuntStatus({
      question1: docSnap.data()?.question1,
      question2: docSnap.data()?.question2,
      question3: docSnap.data()?.question3,
      question4: docSnap.data()?.question4,
      question5: docSnap.data()?.question5,
      question6: docSnap.data()?.question6,
      clue1: docSnap.data()?.clue1,
      clue2: docSnap.data()?.clue2,
      clue3: docSnap.data()?.clue3,
      clue4: docSnap.data()?.clue4,
      clue5: docSnap.data()?.clue5,
      clue6: docSnap.data()?.clue6,
      completed: docSnap.data()?.completed,
      numQuestionsAnswered: docSnap.data()?.numQuestionsAnswered,
    });
  };

  const getScavengerHuntAnswers = async (
    path_num: number
  ): Promise<ScavengerHuntAnswerType> => {
    const docSnap = await firestore()
      .collection("scavenger-hunt-answers")
      .doc(path_num.toString())
      .get();

    const docSnapQuestionAnswers = await firestore()
      .collection("scavenger-hunt-answers")
      .doc("main-questions")
      .get();

    const scavengerHuntAnswers = {
      clue1_answer: docSnap.data()?.clue1_answer,
      clue2_answer: docSnap.data()?.clue2_answer,
      clue3_answer: docSnap.data()?.clue3_answer,
      clue4_answer: docSnap.data()?.clue4_answer,
      clue5_answer: docSnap.data()?.clue5_answer,
      clue6_answer: docSnap.data()?.clue6_answer,
      question1_answer: docSnapQuestionAnswers.data()?.question1_answer,
      question2_answer: docSnapQuestionAnswers.data()?.question2_answer,
      question3_answer: docSnapQuestionAnswers.data()?.question3_answer,
      question4_answer: docSnapQuestionAnswers.data()?.question4_answer,
      question5_answer: docSnapQuestionAnswers.data()?.question5_answer,
      question6_answer: docSnapQuestionAnswers.data()?.question6_answer,
    };

    return scavengerHuntAnswers;
  };

  const resetUserInformation = () => {
    setUserInfo({
      uid: null,
      first_name: null,
      last_name: null,
      points: null,
      registered: null,
      scavenger_hunt_path_num: null,
    });
  };

  const getPoints = async (uid: string | null) => {
    if (!uid) {
      return -1;
    }
    const docSnap = await firestore()
      .collection("users")
      .doc(uid ? uid : "")
      .get();

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
        scavengerHuntStatus,
        signUp,
        logIn,
        resetPassword,
        logInWithGoogle,
        logOut,
        validUser,
        setUserInformation,
        getPoints,
        getScavengerHuntAnswers,
        updateQuestionScavengerHuntStatus,
        updateClueScavengerHuntStatus,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
