import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getFirestore, setDoc, collection, doc, getDoc } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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
    const userDocSnap = await getDoc(userDocRef);
  
    // create a user doc if it doesn't exist
    if (!userDocSnap.exists()){
      const newUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
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
