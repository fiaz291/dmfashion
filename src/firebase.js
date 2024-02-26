// firebase.js

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6SKEQrr5aBgVzRku1WQOD7uofZUrBZlg",
  authDomain: "dmfashion-1d1a8.firebaseapp.com",
  projectId: "dmfashion-1d1a8",
  storageBucket: "dmfashion-1d1a8.appspot.com",
  messagingSenderId: "1082755988846",
  appId: "1:1082755988846:web:7cd78d64dd8d27aef7957f",
  measurementId: "G-9PE5C009FL"
};

let firestore;
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
if (!firestore) {
  firestore = firebaseApp.firestore();
}
export default firestore;
