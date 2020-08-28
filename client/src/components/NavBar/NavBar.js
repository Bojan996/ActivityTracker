import React from 'react';
import './NavBar.css';

const NavBar = (props) => {
    return (
        <div className='NavBarContainer'>
            <div className='NavBarUserInfoDiv'>
                <img src={props.picture} alt='profile pic' className='NavBarUserPicture'/>
                <h1 className='NavBarUserEmail'>{props.email}</h1>
            </div>
            <a href='/api/logout' className='NavBarLogout'>Logout</a>
        </div>
    );
};

export default NavBar;