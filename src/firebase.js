// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiXjnyp4n0K7As5qSO5pJ9sfKgZ01Vous",
  authDomain: "pomodoro-productivity.firebaseapp.com",
  projectId: "pomodoro-productivity",
  storageBucket: "pomodoro-productivity.appspot.com",
  messagingSenderId: "5081308157",
  appId: "1:5081308157:web:90ea598c6a3497f44bd794",
  measurementId: "G-MG9GMRDH2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };