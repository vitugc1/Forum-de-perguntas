import firebase from "firebase";

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyASNWCmERy5q4nFXW1_5iGLDiUjttHlluE",
  authDomain: "nlw-projeto.firebaseapp.com",
  databaseURL: "https://nlw-projeto-default-rtdb.firebaseio.com",
  projectId: "nlw-projeto",
  storageBucket: "nlw-projeto.appspot.com",
  messagingSenderId: "1043999046053",
  appId: "1:1043999046053:web:474d44e9bdf21d0fbb104c",
  measurementId: "G-RM6ZW6V91Z"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {
  firebase,
  auth,
  database
}

