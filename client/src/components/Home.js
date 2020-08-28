import React, { useState, useEffect } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

import { dashboard } from '../helpers/dashboardSwitch';
import NavBar from './NavBar/NavBar';

const Home = (props) => {

    const [menu, setMenu] = useState('To do');

    useEffect(() => {
        props.fetchingTasks();
    }, [props]);

    return (
        <div className='HomeContainer'>
            <NavBar email={props.email} picture={props.picture}/>
            <div className='HomeContent'>
                <div className='SideMenuContainer'>
                    <h1 className='SideMenuHeading'>Catergories</h1>
                    <ul className='SideMenuUl'>
                        <li onClick={() => setMenu('To do')}>To do</li>
                        <li onClick={() => setMenu('To watch')}>To watch</li>
                        <li onClick={() => setMenu('To buy')}>To buy</li>
                        <li onClick={() => setMenu('To travel')}>To travel</li>
                        <li onClick={() => setMenu('Money Graph')}>Money Graph</li>
                    </ul>
                </div>
                <div className='DashboardContainer'>
                    {dashboard(menu)}
                </div>
            </div>
        </div>
    );

};

const mapStateToProps = state => ({
    email: state.auth.user.email,
    picture: state.auth.user.picture,
})

export default connect(mapStateToProps, actions)(Home);