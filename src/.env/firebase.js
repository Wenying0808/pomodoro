import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getFirestore, addDoc, setDoc, collection, doc, getDoc } from 'firebase/firestore';

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
  try{
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    console.log('userCredential', userCredential);

    // Get a reference to the users collection
    const usersCollectionRef = collection(db, 'users');

    // Get a reference to the user doc
    const userDocRef = doc(usersCollectionRef, user.uid);

    // Check if the document exists
    const docSnap = await getDoc(userDocRef);
  
    // create a user doc if it doesn't exist
    if (!docSnap.exists()){
      const newUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        tasks: {},
        clock: {
          focusDuration: 25, 
          breakDuration: 5,  
          totalSessionCount: 4
        },
      };
      await setDoc(userDocRef, newUser);
    }
    return userCredential;
  } catch(error) {
    console.error("Error signing in: ", error);
  }
    
};

export default auth;
export { db, provider, signInWithGoogle };
