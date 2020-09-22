import React, { useState, useEffect } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

import Dashboard from './Dashboard/Dashboard';
import NavBar from './NavBar/NavBar';
import Loader from './UI/Loader/Loader';

const Home = (props) => {

    const [menu, setMenu] = useState('todo');

    useEffect(() => {
        props.fetchingTasks();
        // eslint-disable-next-line 
    }, []);

    return (
        <div className='HomeContainer'>
            <NavBar email={props.email} picture={props.picture}/>
            <div className='HomeContent'>
                <div className='SideMenuContainer'>
                    <h1 className='SideMenuHeading'>Catergories</h1>
                    <ul className='SideMenuUl'>
                        <li onClick={() => setMenu('todo')}>To do</li>
                        <li onClick={() => setMenu('towatch')}>To watch</li>
                        <li onClick={() => setMenu('tobuy')}>To buy</li>
                        <li onClick={() => setMenu('totravel')}>To travel</li>
                        <li>Money Graph</li>
                    </ul>
                </div>
                <div className='DashboardContainer'>
                    {
                        props.loadingTasks ?
                        <Loader/>
                        :
                        <Dashboard type={menu}/>
                    }
                </div>
            </div>
        </div>
    );

};

const mapStateToProps = state => ({
    email: state.auth.user.email,
    picture: state.auth.user.picture,
    loadingTasks: state.tasks.loading
})

export default connect(mapStateToProps, actions)(Home);