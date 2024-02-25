import React from "react";
import './navItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavItem = ({icon, label, active}) => {

 return (
    <li >    
        <a>
            <div className='navItem'>
                <FontAwesomeIcon icon={icon} style={{ color: active ? '#4758DC' : '#404040', fontSize: '20px'}}/>
                <span className='label' style={{ color: active ? '#4758DC' : '#404040', textDecoration: 'none'}}>{label}</span>
            </div>    
        </a>    
    </li>
 );
};

export default NavItem;
