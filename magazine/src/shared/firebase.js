import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARmj_yE3XdKSCcg-Trf9pUYLkVOXBwoa0",
  authDomain: "sparta-react-basic-975fe.firebaseapp.com",
  projectId: "sparta-react-basic-975fe",
  storageBucket: "sparta-react-basic-975fe.appspot.com",
  messagingSenderId: "47157098212",
  appId: "1:47157098212:web:5ca564640c35d663ffdef1",
  measurementId: "G-9M3PJDXG5C",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, apiKey, firestore, storage };
