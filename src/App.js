import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './navbar/navbar';
import CustomToggleButton from './toggleButton/toggleButton';
import Clock from './clock/clock';
import Tasks from './tasks/tasks';
import auth, { db, signInWithGoogle } from './.env/firebase';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { getDoc, getDocs, collection, doc } from 'firebase/firestore';
import beepSound from './audio_BeepSound.wav';
import { DndContext, closestCorners } from '@dnd-kit/core';

export default function App() {
  const [view, setView] = useState('timer');
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
  const [tasks, setTasks] = useState({});
  const [todoOrder, setTodoOrder] = useState([]);
  const [inProgressOrder, setInProgressOrder] = useState([]);
  const [doneOrder, setDoneOrder] = useState([]);

  const formatTime = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60 ;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const fetchTasks = async() => {
    if (!user) return;

    try{
      const userDocRef = doc(db, 'users', user.uid);
      const tasksCollectionRef = collection(userDocRef, "tasks");
      // Fetch all documents in the tasks subcollection
      const tasksQuerySnapshot = await getDocs(tasksCollectionRef);
      /*console.log("fetch tasks tasksQuerySnapshot", tasksQuerySnapshot)*/

      const tasksData = {};
      const todoDefaultOrder = [];
      const inProgressDefaultOrder = [];
      const doneDefaultOrder = [];

      tasksQuerySnapshot.forEach((taskDoc) => {
        tasksData[taskDoc.id] = taskDoc.data();
        if (taskDoc.data().status === 'todo') {
          todoDefaultOrder.push(taskDoc.id);
        } else if (taskDoc.data().status === 'inProgress') {
            inProgressDefaultOrder.push(taskDoc.id);
        } else if (taskDoc.data().status === 'done') {
            doneDefaultOrder.push(taskDoc.id);
        }
      });
      console.log("fetch tasks data", tasksData);

      setTasks(tasksData);
      setTodoOrder(todoDefaultOrder);
      setInProgressOrder(inProgressDefaultOrder);
      setDoneOrder(doneDefaultOrder);

    } catch (error) {
      console.error("Error fetching tasks from firestore:", error);
      setTasks({});
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);
      console.log('currentUser', currentUser);

      setIsLoggedIn(!!currentUser);

      // when user is logged in
      if (currentUser) {
        setUsername(currentUser.displayName);

        // fetch clock settings from user doc
        try {
          const usersCollectionRef = collection(db, 'users');
          const userDocRef = doc(usersCollectionRef, currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if(userDocSnap.exists) {
            /*console.log('userDocSnap', userDocSnap);*/
            // fetch data
            const userData = userDocSnap.data();
            console.log('userData', userData);

            const clockSettingsData = userData.clock;
            /*console.log('clockSettingsData', clockSettingsData);*/

            const clockSettingsDataFocusDuration = clockSettingsData["focusDuration"];
            /*console.log('clockSettingsDataFocusDuration', clockSettingsDataFocusDuration);*/

            const mergedSettingsData = {...clockState, ...clockSettingsData};
            /*console.log('mergedSettingsData', mergedSettingsData);*/

            // fetch clock settings from Firestore and update local clock settings
            setClockState({
              ...clockState,
              // Merge clock settings from user data
              ...clockSettingsData, 
              // Update remainingTime based on fetched focusDuration
              remainingTime: formatTime(parseInt(clockSettingsDataFocusDuration * 60)),
            });

            // fetch tasks
            fetchTasks();
          }
        } catch (error) {
          console.error("Error fetching clock settings:", error);
        }

      // when the user is not logged in
      } else {
        setUsername(null);
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchTasks();
  },[user])

  console.log("fetched tasks", tasks);
  console.log("fetched todoOrder", todoOrder);
  console.log("fetched inProgressOrder", inProgressOrder);
  console.log("fetched doneOrder", doneOrder);

  // move the timer logic to app level in order to keep the timer running when the view switch to tasks
  useEffect(() => {
    const radius = 100;
    let interval;
    if (clockState.timerRunning) {
      // Decrease remaining time every second
      interval = setInterval(() => {
        //create an array which contains minutes and seconds as separate string, then convert string to number by parseFloat
        setClockState(prevState => {
          const [minutes, seconds] = prevState.remainingTime.split(':').map(parseFloat);
          let newMinutes = minutes;
          let newSeconds = seconds - 1;
          if (newSeconds < 0) {
            newMinutes -= 1;
            newSeconds = 59;
          }
          const newTime = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
          //calculate animation of circular progress
          const duration = clockState.timerType === 'Focus' ? prevState.focusDuration : prevState.breakDuration;
          const totalSeconds = duration * 60;
          const circumference = 2 * Math.PI * radius
          const progressIncrement = circumference / totalSeconds; // Calculate the increment per second to reach 1000
          //const newProgress = progressValue + progressIncrement;
          const newProgressValue = prevState.progressValue + progressIncrement; 
            
          if(newTime === '00:04'){
            //play beep sound
            const beepAudio = new Audio(beepSound);
            beepAudio.play();
          }
          //check if the timer has reached 00:00
          if (newTime === '00:00') {
            
            //change timer type
            const nextSessionType = clockState.timerType === 'Focus' ? 'Break' : 'Focus';
            const nextRemainingTime = nextSessionType === 'Break' 
              ? formatTime(prevState.breakDuration * 60)
              : formatTime(prevState.focusDuration * 60);

            let newSessionCount = prevState.sessionCount;
            if (nextSessionType === 'Focus') {
              newSessionCount += 1;
            }
          
            if (nextSessionType === 'Break' && newSessionCount === prevState.totalSessionCount) {
              return {
                ...prevState,
                timerType: 'Complete',
                remainingTime: '',
                timerRunning: false,
                sessionCount: newSessionCount,
                progressValue: 0
              };
            }
            return {
              ...prevState,
              timerType: nextSessionType,
              remainingTime: nextRemainingTime,
              sessionCount: newSessionCount,
              progressValue: 0,
              timerRunning: false
            }; 
          }
          return {
            ...prevState,
            remainingTime: newTime,
            progressValue: newProgressValue,
          };
      });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clockState.timerRunning]);

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
    if (view === 'timer') {
      setView('tasks')
    } else {
      setView('timer')
    }
  };

  const handleClockStateChange = (newClockState) => {
    setClockState(newClockState);
  };

  return (
    <div className='app'>
      <Navbar isLoggedIn={isLoggedIn} onClickLogIn={handleLogIn} onClickLogOut={handleLogOut} username={username}/>
      <div className='content'>
        <CustomToggleButton value={view} onChange={handleViewChange}/>
        { view === 'timer' 
          ? <Clock user={user} clockState={clockState} onClockStateChange={handleClockStateChange}/>  
          : <DndContext collisionDetection={closestCorners}>
              <Tasks 
                user={user} 
                tasks={tasks} 
                setTasks={setTasks}
                todoOrder={todoOrder} 
                inProgressOrder={inProgressOrder} 
                doneOrder={doneOrder} 
                setTodoOrder={setTodoOrder}
                setInProgressOrder={setInProgressOrder}
                setDoneOrder={setDoneOrder}
                />
            </DndContext>
        }
      </div>
    </div>
  );
}

