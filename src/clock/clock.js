import './clock.css';
import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import TimerButton from '../timerButton/timerButton';
import IconButton from "../IconButton/IconButton";
import { faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import CircularProgressTimer from '../curcularProgress/circularProgressTimer';


export default function Clock({ user, clockState, onClockStateChange }) {

  // save clock settings to firestore
  const saveSettingsToFirestore = async (newSettings) => {
    // not logged in
    if (!user) return;

    // loggedin
    try {
      //get the clock collection under usercollection
      const userDocRef = doc(db, "users", user.uid);

      // update the clock settings within the doc
      await updateDoc(userDocRef, { clock: newSettings })
      console.log("Clock settings saved successfully!");
      
    } catch (error){
      console.log('Error saving settings to Firestore', error);
    }
  };

  // Replace all setFocusDuration, setBreakDuration, etc. with:
  const updateClockState = (updates) => {
    onClockStateChange(prevState => {
      const newState = typeof updates === 'function' ? updates(prevState) : updates;
      return { ...prevState, ...newState }
    });
  };
    
  const formatTime = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60 ;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFocusDurationChange = (event) => {
    const valueFocus = event.target.value;
    updateClockState({
      focusDuration: parseInt(valueFocus),
      remainingTime: formatTime(parseInt(valueFocus) * 60),
    });
    saveSettingsToFirestore({
      focusDuration: parseInt(valueFocus),
      breakDuration: clockState.breakDuration,
      totalSessionCount: clockState.totalSessionCount,
    });
    checkEmptySettings(valueFocus, clockState.breakDuration, clockState.totalSessionCount);
  };

  const handleBreakDurationChange = (event) => {
    const valueBreak = event.target.value;
    updateClockState({
      breakDuration: parseInt(valueBreak),
    });
    saveSettingsToFirestore({
      focusDuration: clockState.focusDuration,
      breakDuration: parseInt(valueBreak),
      totalSessionCount: clockState.totalSessionCount,
    });
    checkEmptySettings(clockState.focusDuration, valueBreak, clockState.totalSessionCount);
  };

  const handleTotalSessionCountChange = (event) => {
    const valueSession = event.target.value;
    updateClockState({
      totalSessionCount: parseInt(valueSession),
    });
    saveSettingsToFirestore({
      focusDuration: clockState.focusDuration,
      breakDuration: clockState.breakDuration,
      totalSessionCount: parseInt(valueSession),
    });
    checkEmptySettings(clockState.focusDuration, clockState.breakDuration, valueSession);
  };

  const checkEmptySettings = (focustime, breaktime, sessions) => {
    if (focustime === '' || breaktime === '' || sessions === '') {
      updateClockState({
        isSettingsEmpty: true,
      });
    } else {
      updateClockState({
        isSettingsEmpty: false,
      });
    }
  };

  const handleStartPauseTimer = () => {
    updateClockState(prevState => ({
      timerRunning: !prevState.timerRunning,
    }));
  };

  const handleResetTimer = () => {
    updateClockState({
      timerType: 'Focus',
      remainingTime: formatTime(parseInt(clockState.focusDuration) * 60),
      sessionCout: 1,
      progressValue: 0,
      timerRunning: false
    });
  };

  const toggleSettingsVisibility = () => {
    updateClockState(prevState => ({
      isSettingsVisible: !prevState.isSettingsVisible,
    }));
  };

  return (
      <div className='container'>
        {clockState.isSettingsVisible && (
        <div className={`settings-pane ${clockState.isSettingsVisible ? 'slide-in' : ''}`}>
          <div className='settings-pane-title'>
            Settings
          </div>
          <div className='settings'>  
            <>
              <div className='focus-duration'>
                <span className='input-label'>Focus Duration </span>
                <input 
                    type='number' 
                    id='focus-duration' 
                    name='focus-duration' 
                    placeholder='(mins)' 
                    value={clockState.focusDuration} 
                    min='1' 
                    max='60' 
                    required 
                    onChange={handleFocusDurationChange}
                    
                />
              </div>
              <div className='break-duration'>
                <span className='input-label'>Break Duration</span>
                <input 
                  type='number' 
                  id='break-duration' 
                  name='break-duration' 
                  placeholder='(mins)' 
                  value={clockState.breakDuration} 
                  min='1' 
                  max='30' 
                  required 
                  onChange={handleBreakDurationChange}
                />
                </div>
                <div className='total-session-count'>
                  <span className='input-label'>Session</span>
                  <input 
                    type='number' 
                    id='total-session-count' 
                    name='total-session-count' 
                    placeholder='number' 
                    value={clockState.totalSessionCount} 
                    min='1' 
                    max='100' 
                    required 
                    onChange={handleTotalSessionCountChange}
                    />
                </div>
            </>
          </div>
        </div>)}
        
        <div className='timer'>
          <CircularProgressTimer value={clockState.progressValue} remainingTime={clockState.remainingTime} sessionName={clockState.timerType}/>
          <div className='session-display'>
          {clockState.sessionCount} of {clockState.totalSessionCount} Sessions
          </div>
          <div className='timer-buttons'>
            <IconButton icon={<FontAwesomeIcon icon={faGear} size="xl"></FontAwesomeIcon>} onClick={toggleSettingsVisibility}/>
            {clockState.timerRunning ? 
            <TimerButton icon={faPause} onClick={handleStartPauseTimer}/> : 
            <TimerButton icon={faPlay} onClick={handleStartPauseTimer} disabled={ clockState.isSettingsEmpty || clockState.timerType === 'Complete'}/>
            }
            <TimerButton icon={faRotateLeft} onClick={handleResetTimer} disabled={ (clockState.timerRunning === 'false' && clockState.sessionCount === 1 && clockState.timerType === 'Focus') }/> 
          </div>
        </div>
      </div>
  );
}
