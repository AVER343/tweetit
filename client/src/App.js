import './App.css';

import {Alert, Spinner} from 'react-bootstrap'
import { ERROR_ADDING, ERROR_DELETING } from './redux/error/error.actions';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { getJWT, getUser } from './redux/users/users.utils'

import EnterUsername from './Components/enterUsername/enter.username'
import FriendRequestSent from './Components/friendRequestSent/friendRequestSent'
import FriendsPage from './Pages/Friend/friends.page'
import Header from './Components/header/header.component'
import HomepageComponent from './Components/newTweet/newTweet'
import Messaging from './Components/messaging/messaging.component';
import MyFriends from './Components/my_friends/my_friends.component'
import NewPassword from './Components/newPassword/newPassword'
// import OnlineSidebar from './Components/allOnline/oline.sidebar'
import Profile from './Pages/Profile/profile.page';
import SearchResults from './Components/search/searchResults';
import SignInAndSignOut from './Components/signInAndSignOut/signInAndSignOut.component';
import TopTags from './Components/TopTags/toptags.component';
import YourTweet from './Components/yourTweet/YourTweet'
import { asyncGet } from './redux/profile/profile.actions';
import { connect } from 'react-redux'
import io from 'socket.io-client';

const socket = io('https://tweetit-react.herokuapp.com/');
let e
const App= (props)=> { 
  window.addEventListener('beforeunload', function (e) {
    if(props.currentUser)
      {
        socket.emit('REFRESHED',props.currentUser)
      }  
      delete e['returnValue'];
  });
  useEffect(()=>{
    if(props.currentUser)
    {
      socket.emit('NEW_USER',props.currentUser)
    }
    return () => {
      if(props.currentUser){
        socket.emit('REFRESHED',props.currentUser)
      }
  }
  })
 return (<div style={{size: '100%'}}>
    <Header/>
    <div className="container" style={{marginTop:'10px'}}>
      {props.errors?props.errors.errors.map((elem,idx)=> (<Alert key={idx} variant='danger' onClose={()=>{props.ERROR_DELETING()}} dismissible>
      <b>{elem.error}</b>
    </Alert>)):null}
    </div>
    <Switch>
    <Route exact path='/friends/all'render={()=>props.currentUser?<MyFriends/>:<Redirect to="/login"/>} />
      <Route exact path='/' render={()=>props.currentUser?<HomepageComponent/>:<Redirect to='/login'/>}/>
      <Route exact path='/login' render={()=>props.currentUser?<Redirect to='/'/>:<SignInAndSignOut/>}/>
      <Route path="/toptags" component={TopTags}/>
      <Route path="/:username/all" render={()=>props.currentUser?<YourTweet/>:<Redirect to="/login"/>} />
      <Route path="/search/:username" render={(differentProps)=>props.currentUser?<SearchResults {...differentProps}/>:<Redirect to="/login"/>} />
      <Route path="/profile" render={()=>props.currentUser?<Profile/>:<Redirect to="/login"/>}/>
      <Route exact path='/password/reset' component={EnterUsername}/>
      <Route path='/password/reset/:token' component={NewPassword}/>
      <Route path='/friend'render={()=>props.currentUser?<FriendsPage/>:<Redirect to="/login"/>} />
      <Route exact path='/message/:name'render={()=>props.currentUser?<Messaging/>:<Redirect to="/login"/>} />
      
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
  ERROR_ADDING:()=>dispatch(ERROR_ADDING()),
  ASYNC_GET:(name)=>dispatch(asyncGet(name))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
