import React from "react";
import './circularProgressTimer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons'; 



const CircularProgressTimer = ({ value, remainingTime, sessionName }) => {
    let trackColor;
    let remainingDisplayContent;
    let TimerSize = 220;

    const cx = TimerSize/2; // Center x-coordinate
    const cy = TimerSize/2; // Center y-coordinate
    const radius = (TimerSize-20)/2;
    const circumference = 2 * Math.PI*radius;

    

    if (sessionName === 'Complete') {
      trackColor = 'var(--Salem, #058F23)';
      remainingDisplayContent = <FontAwesomeIcon icon={faCheck} size='lg' color={trackColor} />;
    } else {
      trackColor = sessionName === 'Break' ? 'var(--Jaffa, #F2994A)' : 'var(--RoyalBlue, #4758DC)';
      remainingDisplayContent = <tspan className="remaining-time" x="50%" y="45%" fontSize="72" fontWeight="700" >{remainingTime}</tspan>
    }
    
    return (
      <svg className="circular-progress" width={TimerSize} height={TimerSize} viewBox={`0 0 ${TimerSize} ${TimerSize}`}>
        <circle className="progress-track" cx={cx} cy={cy} r={radius} style={{ stroke: trackColor }} />
        {sessionName !== 'Complete' && (
          <circle className="progress-indicator" cx={cx} cy={cy} r={radius} style={{ strokeDasharray: `${value}, ${circumference}` }} />
        )}
        
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" transform={`rotate(90, ${cx}, ${cy})`}> {/* rotate text 90 degrese clockwisely as the svg in  css rotate -90 degree*/}
          {remainingDisplayContent}
          <tspan className={`session-name ${sessionName === 'Complete' ? 'session-name-complete' : sessionName === 'Break' ? 'session-name-break' : ''}`}  x="50%" y="65%" textAnchor="middle" fontSize="24" fontWeight="700"  fill={trackColor} >{sessionName}</tspan>
        </text>
      </svg>
    );
  };

export default CircularProgressTimer;

