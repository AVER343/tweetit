import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import BasicForm from '../form/form'
const SignInAndSignOut=(props)=>{
    console.log(props)
        return(<div>
            <Container>
                <Row>
                    <Col><h1 style={{textAlign:'center',color:'#007BFF'}}>SIGN IN</h1><BasicForm {...props} formName="login"/></Col>
                    <Col><h1 style={{textAlign:'center',color:'#007BFF'}}>SIGN UP</h1><BasicForm formName="signup" {...props}/></Col>
                </Row>
           </Container>
            </div>)
    
}
export default SignInAndSignOut