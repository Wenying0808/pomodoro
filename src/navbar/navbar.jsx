import React from "react";
import Logo from "../logo/logo";
import IconButton from "../IconButton/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';


export const Navbar = ({onClickSettings}) => {
    return(
        <div className='navbar'>
            <Logo/>
            <IconButton icon={<FontAwesomeIcon icon={faGear} size="xl"></FontAwesomeIcon>} onClick={onClickSettings}/>
        </div>
    );
};

export default Navbar;
