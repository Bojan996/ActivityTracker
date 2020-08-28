import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import { Route } from 'react-router-dom';
import Home from './components/Home';
import Landing from './hoc/Landing';


const App = (props) => {

  useEffect(() => {
    props.fetchUser();
  }, [props]);

  let routes = <Route path='/' component={Landing}/>

  if(props.isAuth){
    routes = <Route path='/' exact component={Home}/>
  }

  console.log(props.isAuth);

  return (
    <div className="App">
      {routes}
    </div>
  );

}


const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, actions)(App);
