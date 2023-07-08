/* eslint-disable no-undef */

// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeFccTkgF8_D0MkAZbrq8ZwLDCubBxVqA",
  authDomain: "keep-76a67.firebaseapp.com",
  projectId: "keep-76a67",
  storageBucket: "keep-76a67.appspot.com",
  messagingSenderId: "464515520994",
  appId: "1:464515520994:web:06c6fb456c7b1dfd1f41bb",
  measurementId: "G-836Y0581J2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();