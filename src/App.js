import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './navbar/navbar';
import CustomToggleButton from './toggleButton/toggleButton';
import Clock from './clock/clock';
import Tasks from './tasks/tasks';
import auth, { db, provider, signInWithGoogle } from './.env/firebase';
import { onAuthStateChanged, signOut} from 'firebase/auth';


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

  const handleClockStateChange = (newClockState) => {
    setClockState(newClockState);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      if (currentUser) {
        setUsername(currentUser.displayName);
      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogIn = async() => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in: ", error);
    }
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
        {view === 'clock' ? <Clock clockState={clockState} onClockStateChange={handleClockStateChange}/>  : <Tasks/>}
      </div>
    </div>
  );
}

