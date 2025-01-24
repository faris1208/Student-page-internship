// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhZA1CLzCi3zsI0GV1H-1ZFPbuED_9K40",
  authDomain: "student-internship-project.firebaseapp.com",
  projectId: "student-internship-project",
  storageBucket: "student-internship-project.firebasestorage.app",
  messagingSenderId: "823811819941",
  appId: "1:823811819941:web:2f8edbba49fce08cc5404c",
  measurementId: "G-02FRQNNFG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);