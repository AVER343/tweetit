import {Button, Col, Form, Row} from 'react-bootstrap'
import { ERROR_ADDING, ERROR_DELETING } from '../../redux/error/error.actions'
import React,{useState} from 'react'
import { getJWT, getUser } from '../../redux/users/users.utils'

import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const EnterUsername =(props)=>{
    const [email,setEmail] = useState(getUser()?.email?getUser().email:'')
    const OnSubmit =async()=>{
        await props.ERROR_DELETING()
   try{ let res=await axios({url:`https://tweetit-react.herokuapp.com/password/reset`,method:'POST',data:{email}}) 
   alert('An Email has been sent to the provided email address ! ')
        props.history.push('/') }
    catch(e){
        if(e.response)
        {
            props.ERROR_ADDING(e.response.data)
        }
        console.log(e)
    }
    }
    return(<Form className="container" >
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Enter the Email :
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control style={{width:'300px'}} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                    </Col>  
                 </Form.Group>
                 <button type="button" onClick={OnSubmit} class="btn btn-outline-success">
                    Submit
                </button>
            </Form>
      )
}
const mapDispatchToProps=(dispatch)=>({
    ERROR_ADDING:(e)=>dispatch(ERROR_ADDING(e)),
    ERROR_DELETING:()=>dispatch(ERROR_DELETING())
})
export default connect(null,mapDispatchToProps)(withRouter(EnterUsername))