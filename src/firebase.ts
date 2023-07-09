/* eslint-disable no-undef */

// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtf9h5jkz0tGlcJHF8Qgdrob4HsqShii4",
  authDomain: "el-accounting.firebaseapp.com",
  projectId: "el-accounting",
  storageBucket: "el-accounting.appspot.com",
  messagingSenderId: "11365444375",
  appId: "1:11365444375:web:b0527f04b3edad8af62552",
  measurementId: "G-BSZRV7BFBW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();