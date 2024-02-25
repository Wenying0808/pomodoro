import React from "react";
import NavItem from "./navItem";
import Logo from "../logo/logo";
import { faClock, faGear } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';


export const Navbar = () => {
    return(
        <div className='navbar'>
            <Logo/>
            <ul className='navItems'>
                <NavItem to='./timer' icon={faClock} label='Timer' />
                <NavItem to='./settings' icon={faGear} label='Settings' />
            </ul>
            <div className='block'></div>
        </div>
    );
};

export default Navbar;
