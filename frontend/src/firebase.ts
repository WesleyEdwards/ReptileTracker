// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGWxg2s2kaCKWS2y9zBfOmG12pXTteQJY",
  authDomain: "edwards-reptiles.firebaseapp.com",
  projectId: "edwards-reptiles",
  storageBucket: "edwards-reptiles.appspot.com",
  messagingSenderId: "469673433804",
  appId: "1:469673433804:web:8e4aee586f34c4df928069",
  measurementId: "G-D7HSGKK5LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);