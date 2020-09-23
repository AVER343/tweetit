import { Button, FormControl, Image } from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'

import { ERROR_ADDING } from '../../redux/error/error.actions'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React from 'react'
import { asyncLogOut } from '../../redux/users/users.actions'
import axios from 'axios'
import { connect } from 'react-redux'
import { getJWT } from '../../redux/users/users.utils'
import io from 'socket.io-client';
import { useState } from 'react'

const socket = io('https://tweetit-react.herokuapp.com/');

const Header=(props)=>{
  const [people,setPeople]=useState(0)
  const [search,setSearch]=useState('')
  socket.on('NEW_USER',(people_count)=>{
    setPeople(people_count)
  })
  const handleSeached=async(name)=>{
    const posted=await axios.get(`https://tweetit-react.herokuapp.com/username/${name}`,{ headers:{'Authorization':`Bearer ${getJWT()}`,"Content-Type": "multipart/form-data"}})
    if(posted.status==200)
    {
      if(posted.data.users.length>0)
      {
        props.history.push({pathname:`/search/${name}`,state:{users:posted.data.users}})
      }
      else{
        props.ERROR_ADDING({errors:[{error:'No user with related username !'}]})
      }
    }
  }
  return (
        <Navbar className="navbar-fixed-top" bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    src="https://i.ibb.co/6vjCjWK/OnlyLoGO.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                /> <Link to="/" style={{color:"white"}}>TWEETIT</Link></Navbar.Brand>
            <Nav className="mr-auto">
            <Nav style={{color:'#C0C0C0'}}>Online : {people} </Nav>
            
            </Nav>
          
            <Form inline>
                 <Nav.Link><Link to="/toptags">{"Top Tags".toUpperCase()}</Link></Nav.Link>
               {props.user?<Nav.Link href=""><Link to="/friend">{"Requests".toUpperCase()}</Link></Nav.Link>:null}
               {props.user?<Nav.Link href=""><Link to="/feed">{"My Feed".toUpperCase()}</Link></Nav.Link>:null}
               {props.user?<Nav.Link href=""><Link to="/friends/all">{"Friends".toUpperCase()}</Link></Nav.Link>:null}
               {props.user?null:<Nav.Link href=""><Link to="/login">{"login".toUpperCase()}</Link></Nav.Link>}
               {props.user?<Nav.Link href="#"><Link to={`/${props.user.username}/all`}>{"your tweets".toUpperCase()}</Link></Nav.Link>:null}
               {props.user?<Nav.Link href="#">
               <Link to={`/profile/${props.user.username}`}>
                <Image
                roundedCircle
                    src={props.profile?props.profile.image?`data:image/jpeg;base64,${props.profile.image}`:"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg":"https://www.flaticon.com/svg/static/icons/svg/848/848006.svg"}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    style={{marginRight:'10px'}}
                /> </Link></Nav.Link>:null}
               {props.user? <Form inline>       
              <FormControl type="text" value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Search" className="mr-sm-2" />
              <Button onClick={()=>handleSeached(search)} variant="outline-info">Search</Button>
              {props.user?<Nav.Link href="#" onClick={()=>props.LOGOUT()}>{"Signout".toUpperCase()}</Nav.Link>:null}
            
            </Form>:null}
            </Form>
        </Navbar>)
}
const mapStateToProps=(state)=>({
  user:state.user,
  profile:state.profile
    })
const dispatchStateToProps=dispatch=>({
LOGOUT:()=>dispatch(asyncLogOut()),
ERROR_ADDING:(error)=>dispatch(ERROR_ADDING(error))
})
 export default withRouter(connect(mapStateToProps,dispatchStateToProps)(Header))