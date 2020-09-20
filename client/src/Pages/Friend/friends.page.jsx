import {Alert, Button, Image} from 'react-bootstrap'
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import React,{useEffect, useState} from 'react'

import FriendRequestReceived from '../../Components/friends/friendRequest'
import FriendRequestSent from '../../Components/friendRequestSent/friendRequestSent'
import axios from 'axios'

const FriendsPage=(props)=>{
        const [friends,setFriends] = useState([])
        useEffect(()=>{
         async function newFunc(){
          }
          newFunc()
        })
    return(<div>
            <div className="container" style={{textAlign:'center'}}>
            <Alert key='1' variant='warning'>
                Request SENT :
                </Alert>
                  <FriendRequestSent/>
                <Alert key='2' variant='success'>
                Request RECEIVED :
                </Alert>
                   <FriendRequestReceived/>  
            </div>
        </div>)
}
export default withRouter(FriendsPage)