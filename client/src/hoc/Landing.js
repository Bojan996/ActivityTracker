import React from 'react';
import './Landing.css';
import background from '../assets/landingBackground.jpg';
import computer from '../assets/computer.png';
import phone from '../assets/phone.png';

const Landing = () => {

    return (
        <div className='LandingContainer'>
            <img className='LandingBakcgroundImage' src={background} alt='background'/>
            <div className='LandingContentContainer'>
                <div className="LandingHeadeingDiv">
                    <h1 className='LandingHeading'>Make changes <br/> Tracker</h1>
                    <p className='LandingParagraph'>
                        - Use Tracker to document your plans! <br/>
                        Have a full view of activities that you would like to do. <br/>
                        Write it down and don't forget!
                    </p>
                    <button className='LandingLoginButton'><a href='/auth/google'>Login with Google</a><i className="fas fa-angle-right arrowIcon"></i><i className="fab fa-google googleIcon"></i></button>
                </div>
                <img src={phone} alt='phone' className='LandingPhoneImage'/>
                <img src={computer} alt='computer' className='LandingComputerImage'/>
                <h1 className='LandingHeadingSecond'>Access from <br/> desktop and mobile</h1>
            </div>
        </div>
    );
};

export default Landing;