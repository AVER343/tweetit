import {Col, Form, Row} from 'react-bootstrap'
import {ERROR_ADDING, ERROR_DELETING} from '../../redux/error/error.actions'

import {Button} from 'react-bootstrap'
import InputSingle from '../input/inputGroup'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {useState} from 'react'
import {withRouter} from 'react-router-dom'

const NewPassword=(props)=>{
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const OnSubmit=async()=>{
       await props.ERROR_DELETING()
      try{
        const res= await axios({url:`http://localhost:7000/password/reset/${props.location.pathname.split('/')[3]}`,method: 'POST',data:{password,confirmPassword}},)
       if(res.status==200){
           alert('Your Password has been successfully chaanged !')
           props.history.push('/')
       }
      }
      catch(e){
        console.log(e)
       if(e.response)
       {
           props.ERROR_ADDING(e.response.data)
       }
      }
    }
    return(<div className="container" style={{marginTop:window.innerHeight/3,width:window.innerWidth/2}}>
           {/* name="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} */}
           <Form>
            <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                Password
                </Form.Label>
                <Col sm="10">
                <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                Confirm Password
                </Form.Label>
                <Col sm="10">
                <Form.Control value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                </Col>
            </Form.Group>
            <Button variant="outline-secondary" onClick={OnSubmit}>Secondary</Button>
            </Form>
        </div>)
    }
    const mapDispatchToProps =dispatch =>({
        ERROR_ADDING:(e)=>dispatch(ERROR_ADDING(e)),
        ERROR_DELETING:()=>dispatch(ERROR_DELETING())    
    })
export default connect(null, mapDispatchToProps)(withRouter(NewPassword))