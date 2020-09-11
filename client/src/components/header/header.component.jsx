import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { asyncLogOut } from '../../redux/users/users.actions'
const Header=(props)=>(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <img
                    src="https://react-bootstrap.netlify.app/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                /> <Link to="/" style={{color:"white"}}>TWEETIT</Link></Navbar.Brand>
            <Nav className="mr-auto">
                
            </Nav>
            <Form inline>
            {props.user?<Nav.Link><Link to="/" style={{color:"white"}}>EMAIL :  {` ${props.user.email}`}</Link></Nav.Link>:null}
            {props.user?<Nav.Link><Link to="/" style={{color:"white"}}>USERNAME : {` ${props.user.username}`}</Link></Nav.Link>:null}
               <Nav.Link><Link to="/toptags">{"Top Tags".toUpperCase()}</Link></Nav.Link>
               {props.user?null:<Nav.Link href=""><Link to="/login">{"login".toUpperCase()}</Link></Nav.Link>}
               {props.user?<Nav.Link href="#"><Link to={`/${props.user.username}/all`}>{"your tweets".toUpperCase()}</Link></Nav.Link>:null}
               {props.user?<Nav.Link href="#" onClick={()=>props.LOGOUT()}>{"Signout".toUpperCase()}</Nav.Link>:null}
            </Form>
        </Navbar>)
const mapStateToProps=(state)=>({
      user:state.user
        })
const dispatchStateToProps=dispatch=>({
  LOGOUT:()=>dispatch(asyncLogOut())
})
 export default connect(mapStateToProps,dispatchStateToProps)(Header)