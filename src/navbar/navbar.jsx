import React from "react";
import { colors } from "../colors/colors";
import Logo from "../logo/logo";
import TextButton from "../textButton/textButton";
import './navbar.css';

export const Navbar = ({ isLoggedIn, onClickLogIn, onClickLogOut, username }) => {
    return(
        <div className='navbar'>
            <Logo/>
            <div className='actions'>
                {isLoggedIn 
                    ? 
                    <div className="name-button">
                        <span style={{ color: colors.Thundora }}>{`Have a productive day, ${username} !`}</span>
                        <TextButton label="Log Out" onClick={onClickLogOut}/>
                    </div>
                    : 
                    <TextButton label="Log In" onClick={onClickLogIn}/>
                }
            </div>
            
        </div>
    );
};

export default Navbar;
