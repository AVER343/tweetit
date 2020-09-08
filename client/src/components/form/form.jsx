import axios from 'axios'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

class BasicForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            username:''
        }
    }
    localHandleChange=(event)=>{
        let {name,value}=event.target
        this.setState({[name]:value})
    }
    localhandleSubmit=async (event)=>{
     try{   
        event.preventDefault()
        let res
        if(this.props.formName=='signup')
        {
             res = await axios({url:`/users/${this.props.formName}`,data:{...this.state},method:'POST'})
        }
        else{
             res = await axios({url:`/users/${this.props.formName}`,data:{email:this.state.username,password:this.state.password},method:'POST'})
        }
        if(res.status===200||res.status==201)
        {
           await this.props.handleChange(res)
           
        }}
        catch(e){
            console.log(e)
        }
    }
    render(){
        return(
            <Form>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>{this.props.formName=="signup"?"Username":"Email"}</Form.Label>
            <Form.Control value={this.state.username} name='username' onChange={this.localHandleChange} type="text" placeholder={this.props.formName=="signup"?"Enter Username":"Enter Email"} />
          </Form.Group>
         {this.props.formName=="signup"? <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={this.state.email} name='email' onChange={this.localHandleChange} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>:null}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={this.state.password} name='password' onChange={this.localHandleChange} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button onClick={this.localhandleSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        )
    }
}
export default BasicForm