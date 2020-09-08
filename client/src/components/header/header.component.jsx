import React from 'react'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
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
            {props.username?<Nav.Link><Link to="/" style={{color:"white"}}>EMAIL :  {` ${props.email}`}</Link></Nav.Link>:null}
            {props.username?<Nav.Link><Link to="/" style={{color:"white"}}>USERNAME : {` ${props.username}`}</Link></Nav.Link>:null}
               <Nav.Link><Link to="/toptags">{"Top Tags".toUpperCase()}</Link></Nav.Link>
               {props.username?null:<Nav.Link href=""><Link to="/login">{"login".toUpperCase()}</Link></Nav.Link>}
               {props.username?<Nav.Link href="#"><Link to={`/${props.username}/all`}>{"your tweets".toUpperCase()}</Link></Nav.Link>:null}
               {props.username?<Nav.Link href="#" onClick={props.handleSignOut}>{"Signout".toUpperCase()}</Nav.Link>:null}
            </Form>
        </Navbar>)
 export default Header