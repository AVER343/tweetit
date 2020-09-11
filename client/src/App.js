import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import {Alert, Spinner} from 'react-bootstrap'
import Header from './Components/header/header.component'
import { connect } from 'react-redux'
import HomepageComponent from './Components/newTweet/newTweet'
import { ERROR_DELETING,ERROR_ADDING } from './redux/error/error.actions';
import SignInAndSignOut from './Components/signInAndSignOut/signInAndSignOut.component';
import TopTags from './Components/TopTags/toptags.component';
import YourTweet from './Components/yourTweet/YourTweet'
import SpinnerValue from './Components/spinner/spinner';

const App= (props)=> { 
 return (<div style={{size: '100%'}}>
    <Header/>
    <div className="container" style={{marginTop:'10px'}}>
      {props.errors?props.errors.errors.map((elem,idx)=> (<Alert key={idx} variant='danger' onClose={()=>{props.ERROR_DELETING()}} dismissible>
      <b>{elem.error}</b>
    </Alert>)):null}
    </div>
    <Switch>
      <Route exact path='/' render={()=>props.currentUser?<HomepageComponent/>:<Redirect to='/login'/>}/>
      <Route exact path='/login' render={()=>props.currentUser?<Redirect to='/'/>:<SignInAndSignOut/>}/>
      <Route path="/toptags" component={TopTags}/>
      <Route path="/:username/all" render={()=>props.currentUser?<YourTweet/>:<Redirect to="/login"/>} />
    </Switch>
    </div>
  );
}
const mapStateToProps=(state)=>({
  currentUser: state.user,
  errors:state.errors
})
const mapDispatchToProps =(dispatch)=>({
  ERROR_DELETING:()=>dispatch(ERROR_DELETING()),
  ERROR_ADDING:()=>dispatch(ERROR_ADDING())
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
