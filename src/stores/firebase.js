import firebase from "firebase/app";
import { firebaseConfig } from "../../.env";

export const firebaseInit = async () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    return;
  } else {
    firebase.app();
    return; // if already initialized, use that one
  }
};
