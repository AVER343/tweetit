import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import SignIn from '../signIn/signIn.component'
import SignUp from '../signUp/signUp.component'
const SignInAndSignOut=()=>{
        return(<div>
            <Container>
                <Row>
                    <Col><h1 style={{textAlign:'center',color:'#007BFF'}}>SIGN IN</h1><SignIn/></Col>
                    <Col><h1 style={{textAlign:'center',color:'#007BFF'}}>SIGN UP</h1><SignUp/></Col>
                </Row>
           </Container>
            </div>)
    
}
export default SignInAndSignOut