import React from 'react';
import './IconButton.css';
import Tooltip from '../Tooltip/Tooltip';

const IconButton = (
    {disabled,
    icon,
    onClick,
    onMouseover,
    
    }) => {
        const getClassName = () => {
            let className = `IconButtonDiv ${disabled ? "disabled" : ""}`;
            return className;
        };
    return(
            <div className={getClassName()} onClick={onClick} onMouseOver={onMouseover}>           
            {icon}
            </div>
        );
};

export default IconButton;