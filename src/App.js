import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './navbar/navbar';
import CustomToggleButton from './toggleButton/toggleButton';
import Clock from './clock/clock';
import Tasks from './tasks/tasks';
import auth, { db, provider, signInWithGoogle } from './.env/firebase';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { getDoc, collection, doc } from 'firebase/firestore';


export default function App() {
  const [view, setView] = useState('clock');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [clockState, setClockState] = useState({
    focusDuration: 25,
    breakDuration: 5,
    timerRunning: false,
    timerType: 'Focus',
    remainingTime: '25:00',
    sessionCount: 1,
    totalSessionCount: 4,
    progressValue: 0,
    isSettingsEmpty: false,
    isSettingsVisible: false,
  });

  const formatTime = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60 ;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClockStateChange = (newClockState) => {
    setClockState(newClockState);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);
      console.log('currentUser', currentUser);

      setIsLoggedIn(!!currentUser);
      if (currentUser) {
        setUsername(currentUser.displayName);

        // fetch clock settings from user doc
        try {
          const usersCollectionRef = collection(db, 'users');
          const userDocRef = doc(usersCollectionRef, currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if(userDocSnap.exists) {
            console.log('userDocSnap', userDocSnap);
            // fetch data
            const userData = userDocSnap.data();
            console.log('userData', userData);

            const clockSettingsData = userData.clock;
            console.log('clockSettingsData', clockSettingsData);

            const clockSettingsDataFocusDuration = clockSettingsData["focusDuration"];
            console.log('clockSettingsDataFocusDuration', clockSettingsDataFocusDuration);

            const mergedSettingsData = {...clockState, ...clockSettingsData};
            console.log('mergedSettingsData', mergedSettingsData);

            // update clock settings
            setClockState({
              ...clockState,
              // Merge clock settings from user data
              ...clockSettingsData, 
              // Update remainingTime based on fetched focusDuration
              remainingTime: formatTime(parseInt(clockSettingsDataFocusDuration * 60)),
            });
          }

        } catch (error) {
          console.error("Error fetching clock settings:", error);
        }

      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogIn = async() => {
    await signInWithGoogle();
  };

  const handleLogOut = async() => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleViewChange = () => {
    if (view === 'clock') {
      setView('tasks')
    } else {
      setView('clock')
    }
  };

  return (
    <div className='app'>
      <Navbar isLoggedIn={isLoggedIn} onClickLogIn={handleLogIn} onClickLogOut={handleLogOut} username={username}/>
      <div className='content'>
        <CustomToggleButton value={view} onChange={handleViewChange}/>
        {view === 'clock' ? <Clock user={user} clockState={clockState} onClockStateChange={handleClockStateChange}/>  : <Tasks/>}
      </div>
    </div>
  );
}

