import React from "react";
import './timerButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TimerButton = ({icon, disabled, onClick}) => {
    return(
        <div className={`timerButton ${disabled ? ' disabled' : ''}`} onClick={onClick}>
            <FontAwesomeIcon icon={icon} style={{ color: '#FFFFFF', fontSize: '20px'}}/>
        </div>
    );
};
export default TimerButton;