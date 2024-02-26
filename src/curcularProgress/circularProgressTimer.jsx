import React from "react";
import './circularProgressTimer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons'; 



const CircularProgressTimer = ({ value, remainingTime, sessionName }) => {
    let trackColor;
    let renamingDisplayContent;
    if (sessionName === 'Complete') {
      trackColor = 'var(--Salem, #058F23)';
      renamingDisplayContent = <FontAwesomeIcon icon={faCheck} size='lg' color={trackColor} x="50%" y="45%"/>;
    } else {
      trackColor = sessionName === 'Break' ? 'var(--Jaffa, #F2994A)' : 'var(--RoyalBlue, #4758DC)';
      renamingDisplayContent = <tspan className="remaining-time" x="50%" y="45%" fontSize="72" fontWeight="700" >{remainingTime}</tspan>
    }
    
  
    return (
      <svg className="circular-progress" width="360" height="360" viewBox="0 0 360 360">
        <circle className="progress-track" cx="180" cy="180" r="170" style={{ stroke: trackColor }} />
        {sessionName !== 'Complete' && (
          <circle className="progress-indicator" cx="180" cy="180" r="170" style={{ strokeDasharray: `${value}, 1700` }} />
        )}
        
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" transform="rotate(90, 180, 180)"> {/* rotate text 90 degrese clockwisely as the svg in  css rotate -90 degree*/}
          {renamingDisplayContent}
          <tspan className={`session-name ${sessionName === 'Complete' ? 'session-name-complete' : sessionName === 'Break' ? 'session-name-break' : ''}`}  x="50%" y="65%" textAnchor="middle" fontSize="32" fontWeight="700"  fill={trackColor} >{sessionName}</tspan>
        </text>
      </svg>
    );
  };

export default CircularProgressTimer;

