import React from 'react';
import './IconButton.css';
import Tooltip from '../Tooltip/Tooltip';

const IconButton = (
    {disabled,
    icon,
    onClick,
    onMouseover,
    tooltipText,
    }) => {
        const getClassName = () => {
            let className = `IconButtonDiv ${disabled ? "disabled" : ""}`;
            return className;
        };
    return(
        <Tooltip tooltipText={tooltipText} >
            <div className={getClassName()} onClick={onClick} onMouseOver={onMouseover}>           
            {icon}
            </div>
        </Tooltip>
        
        );
};

export default IconButton;