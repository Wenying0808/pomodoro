import React from "react";
import Logo from "../logo/logo";

import TextButton from "../textButton/textButton";

import './navbar.css';


export const Navbar = ({isLoggedIn, onClickLogIn, onClickLogOut}) => {
    return(
        <div className='navbar'>
            <Logo/>
            <div className='actions'>
                {isLoggedIn 
                    ?  <TextButton label="Log Out" onClick={onClickLogOut}/>
                    : <TextButton label="Log In" onClick={onClickLogIn}/>
                }
            </div>
            
        </div>
    );
};

export default Navbar;
