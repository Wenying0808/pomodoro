import './clock.css';
import React, {useState, useEffect} from 'react';
import TimerButton from '../timerButton/timerButton';
import IconButton from "../IconButton/IconButton";
import { faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import beepSound from '../audio_BeepSound.wav';
import CircularProgressTimer from '../curcularProgress/circularProgressTimer';


export default function Clock({ clockState, onClockStateChange }) {
  const {
    focusDuration,
    breakDuration,
    timerRunning,
    timerType,
    remainingTime,
    sessionCount,
    totalSessionCount,
    progressValue,
    isSettingsEmpty,
    isSettingsVisible,
  } = clockState;

  // Replace all setFocusDuration, setBreakDuration, etc. with:
  const updateClockState = (updates) => {
    onClockStateChange(prevState => {
      const newState = typeof updates === 'function' ? updates(prevState) : updates;
      return { ...prevState, ...newState }
    });
  };

  const radius = 100;

  useEffect (() => {
    let interval;
    if (clockState.timerRunning) {
      // Decrease remaining time every second
      interval = setInterval(() => {
        //create an array which contains minutes and seconds as separate string, then convert string to number by parseFloat
        const [minutes, seconds] = clockState.remainingTime.split(':').map(parseFloat);
        let newMinutes = minutes;
        let newSeconds = seconds - 1;
        if (newSeconds < 0) {
          newMinutes -= 1;
          newSeconds = 59;
        }

        const newTime = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        updateClockState({
          remainingTime: newTime,
        });

        if(newTime === '00:04'){
          //play beep sound
          const beepAudio = new Audio(beepSound);
          beepAudio.play();
        }

        //calculate animation of circular progress
        
          const duration = clockState.timerType === 'Focus' ? clockState.focusDuration : clockState.breakDuration;
          const circumference = 2 * Math.PI * radius
          const progressIncrement = circumference / (duration * 60); // Calculate the increment per second to reach 1000
          //const newProgress = progressValue + progressIncrement;
          
          //make sure that the progressValue is up-to-date when resizing
          updateClockState({
            progressValue: prevProgressValue => prevProgressValue + progressIncrement,
          });

        //check if the timer has reached 00:00
        if (newTime === '00:00') {
          
          //change timer type
          const nextSessionType = clockState.timerType === 'Focus' ? 'Break' : 'Focus';
          updateClockState({
            timerType: nextSessionType,
          });

          // Reset progress value when timer type changes
          updateClockState({
            progressValue: 0,
          });

          //change remaning time
          const nextRemainingTime = nextSessionType === 'Break' ? formatTime(clockState.breakDuration * 60) : formatTime(clockState.focusDuration * 60);
          updateClockState({
            remainingTime: nextRemainingTime,
          });
      
          //change session count when it was a complete session 
          if (nextSessionType === 'Focus') {
            updateClockState({
              sessionCount: prevSessionCount => prevSessionCount + 1,
            });
          }
        
          if (nextSessionType === 'Break' && clockState.sessionCount === clockState.totalSessionCount) {
            updateClockState({
              timerType: 'Complete',
              remainingTime: '',
              timerRunning: false
            });
          }
          
          //pause the timer
          updateClockState({
            timerRunning: false
          });
        }

      }, 1000);

    } else {
      //The cleanup function returned by useEffect clears the interval when the component is unmounted.
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup on unmount

  }, [clockState]);
    
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
    checkEmptySettings(valueFocus, clockState.breakDuration, clockState.totalSessionCount);
  };

  const handleBreakDurationChange = (event) => {
    const valueBreak = event.target.value;
    updateClockState({
      breakDuration: parseInt(valueBreak),
    });
    checkEmptySettings(clockState.focusDuration, valueBreak, clockState.totalSessionCount);
  };

  const handleTotalSessionCountChange = (event) => {
    const valueSession = event.target.value;
    updateClockState({
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
    updateClockState({
      timerRunning: prev => !prev,
    });
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
            <TimerButton icon={faRotateLeft} onClick={handleResetTimer} disabled={ !clockState.timerRunning && clockState.sessionCount === 1 && clockState.timerType === 'Focus'}/> 
          </div>
        </div>
      </div>
  );
}
