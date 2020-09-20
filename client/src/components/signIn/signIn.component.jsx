import {Button, Form} from 'react-bootstrap'

import {Link} from 'react-router-dom'
import React from 'react';
import { asyncLogIn } from '../../redux/users/users.actions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.LOGIN({email:this.state.email,password:this.state.password})
  };
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  handleOnclick=()=>{
    this.props.history.push('/password/reset')
  }
  render() {
    return (<Form>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control value={this.state.email} name='email' onChange={this.handleChange} type="text" placeholder="Enter Email"/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={this.state.password} name='password' onChange={this.handleChange} type="password" placeholder="Password" />
          </Form.Group>
          <div>
              <Button style={{display:'inline'}} onClick={this.handleSubmit} variant="outline-primary" type="submit">
                Submit
              </Button>
              <Button onClick={this.handleOnclick} style={{display:'inline',marginLeft:'50px'}} variant="outline-danger" type="submit">
                Forgot Password ?
              </Button>
          </div>
        </Form>
    );
  }
}
const mapDispatchToProps=dispatch=>({
  LOGIN:user=>{dispatch(asyncLogIn(user))}
})
export default withRouter(connect(null,mapDispatchToProps)(SignIn));