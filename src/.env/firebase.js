import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const firebaseConfig = {
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
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async() => {
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;

  // check if user already exist
  const userRef = collection(db, "users");
  const q = query(userRef, where("uid", "==", user.uid))
  const querySnapshot = await getDocs(q);

  // create a user doc if it doesn't exist
  if (querySnapshot.empty){
    const newUser = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      tasks: [],
      clock: [],
    };
    await addDoc(userRef, newUser);
  }
  return userCredential;
};

export default auth;
export { db, provider, signInWithGoogle };
