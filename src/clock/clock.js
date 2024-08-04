import './clock.css';
import React, {useState, useEffect} from 'react';
import TimerButton from '../timerButton/timerButton';
import IconButton from "../IconButton/IconButton";
import { faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import beepSound from '../audio_BeepSound.wav';
import CircularProgressTimer from '../curcularProgress/circularProgressTimer';


function Clock() {
  const [focusDuration, setFocusDuration] = useState('');
  const [breakDuration, setBreakDuration] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerType, setTimerType] = useState('Focus');
  const [remainingTime, setRemainingTime] = useState ('');
  const [sessionCount, setSessionCount] = useState (1);
  const [totalSessionCount, setTotalSessionCount] = useState ('');
  const [isSettingsEmpty, setIsSettingsEmpty] = useState (true);
  const [isSettingsVisible, setIsSettingsVisible] = useState (true);
  const [progressValue, setProgressValue] = useState(0);
  const [radius, setRadius] = useState(100);

  useEffect (() => {
    let interval;
    if (timerRunning) {
      // Decrease remaining time every second
      interval = setInterval(() => {
        //create an array which contains minutes and seconds as separate string, then convert string to number by parseFloat
        const [minutes, seconds] = remainingTime.split(':').map(parseFloat);
        let newMinutes = minutes;
        let newSeconds = seconds - 1;
        if (newSeconds < 0) {
          newMinutes -= 1;
          newSeconds = 59;
        }

        const newTime = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        setRemainingTime (newTime);

        if(newTime === '00:04'){
          //play beep sound
          const beepAudio = new Audio(beepSound);
          beepAudio.play();
        }


        //calculate animation of circular progress
        
          const duration = timerType === 'Focus' ? focusDuration : breakDuration;
          const circumference = 2 * Math.PI * radius
          const progressIncrement = circumference / (duration * 60); // Calculate the increment per second to reach 1000
          //const newProgress = progressValue + progressIncrement;
          
          //make sure that the progressValue is up-to-date when resizing
          setProgressValue(prevProgressValue => prevProgressValue + progressIncrement);
       

        //check if the timer has reached 00:00
        if (newTime === '00:00') {
          
          //change timer type
          const nextSessionType = timerType === 'Focus' ? 'Break' : 'Focus';
          setTimerType(nextSessionType);
          // Reset progress value when timer type changes
          setProgressValue(0);

          //change remaning time
          const nextRemainingTime = nextSessionType === 'Break' ? formatTime(breakDuration * 60) : formatTime(focusDuration * 60);
          setRemainingTime(nextRemainingTime);
      
          //change session count when it was a complete session 
          if (nextSessionType === 'Focus') {
            setSessionCount(prevSessionCount => prevSessionCount + 1);
            }
        
          if (nextSessionType === 'Break' && sessionCount === totalSessionCount) {
            setTimerType('Complete');
            setRemainingTime('');
            setTimerRunning(false);
          }
          
          //pause the timer
          setTimerRunning(false);
        }

      }, 1000);

    } else {
      //The cleanup function returned by useEffect clears the interval when the component is unmounted.
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup on unmount

  }, [timerRunning, timerType, remainingTime, sessionCount, totalSessionCount, focusDuration, breakDuration, progressValue, radius]);
    
  const formatTime = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60 ;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFocusDurationChange = (event) => {
    const valueFocus = event.target.value;
    setFocusDuration(parseInt(valueFocus));
    setRemainingTime(formatTime(parseInt(valueFocus) * 60));
    checkEmptySettings(valueFocus, breakDuration, totalSessionCount);
  };

  const handleBreakDurationChange = (event) => {
    const valueBreak = event.target.value;
    setBreakDuration(parseInt(valueBreak));
    checkEmptySettings(focusDuration, valueBreak, totalSessionCount);
  };

  const handleTotalSessionCountChange = (event) => {
    const valueSession = event.target.value;
    setTotalSessionCount(parseInt(valueSession));
    checkEmptySettings(focusDuration, breakDuration, valueSession);
  };

  const checkEmptySettings = (focustime, breaktime, sessions) => {
    if (focustime === '' || breaktime === '' || sessions === '') {
      setIsSettingsEmpty (true);
    } else {
      setIsSettingsEmpty (false);
    }
  };

  const handleStartPauseTimer = () => {
    setTimerRunning( isTimerRunning => !isTimerRunning);
  };

  
  const handleResetTimer = () => {
    setTimerType('Focus');
    setRemainingTime(formatTime(parseInt(focusDuration) * 60));
    setSessionCount(1);
    setProgressValue(0); // Reset progress value
    setTimerRunning(false);
  };

  const toggleSettingsVisibility = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  return (
      <div className='wrapper'>
        {isSettingsVisible && (
        <div className={`settings-pane ${isSettingsVisible ? 'slide-in' : ''}`}>
          <div className='settings-pane-title'>
            Settings
          </div>
          <div className='settings'>  
              <><div className='focus-duration'>
                <span className='input-label'>Focus Duration </span>
                <input 
                    type='number' 
                    id='focus-duration' 
                    name='focus-duration' 
                    placeholder='(mins)' 
                    value={focusDuration} 
                    min='1' 
                    max='60' 
                    required 
                    onChange={handleFocusDurationChange}
                    onBlur={() => setFocusDuration(prev => prev === '' ? '' : parseInt(prev))}
                />
              </div><div className='break-duration'>
                  <span className='input-label'>Break Duration</span>
                  <input 
                    type='number' 
                    id='break-duration' 
                    name='break-duration' 
                    placeholder='(mins)' 
                    value={breakDuration} 
                    min='1' 
                    max='30' 
                    required 
                    onChange={handleBreakDurationChange}
                    onBlur={() => setBreakDuration(prev => prev === '' ? '' : parseInt(prev))}
                />
                </div><div className='total-session-count'>
                  <span className='input-label'>Session</span>
                  <input 
                    type='number' 
                    id='total-session-count' 
                    name='total-session-count' 
                    placeholder='number' 
                    value={totalSessionCount} 
                    min='1' 
                    max='100' 
                    required 
                    onChange={handleTotalSessionCountChange}
                    onBlur={() => setTotalSessionCount(prev => prev === '' ? '' : parseInt(prev))}
                    />
                </div></>
            
          </div>
        </div>)}
        
        <div className='timer'>
          <CircularProgressTimer value={progressValue} remainingTime={remainingTime} sessionName={timerType}/>
          <div className='session-display'>
          {sessionCount} of {totalSessionCount} Sessions
          </div>
          <div className='timer-buttons'>
            <IconButton icon={<FontAwesomeIcon icon={faGear} size="xl"></FontAwesomeIcon>} onClick={toggleSettingsVisibility}/>
            {timerRunning ? 
            <TimerButton icon={faPause} onClick={handleStartPauseTimer}/> : 
            <TimerButton icon={faPlay} onClick={handleStartPauseTimer} disabled={ isSettingsEmpty || timerType === 'Complete'}/>
            }
            <TimerButton icon={faRotateLeft} onClick={handleResetTimer} disabled={isSettingsEmpty}/> 
          </div>
        </div>
      </div>
  );
}

export default Clock;