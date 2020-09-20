import React from 'react';
import { asyncSignUp } from '../../redux/users/users.actions';
import { connect } from 'react-redux';
import {Form,Button} from 'react-bootstrap'
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
  handleSubmit = async event => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    this.props.SIGN_UP({email,password,name:username,confirmPassword})
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return( <Form>
      <Form.Group controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control value={this.state.username} name='username' onChange={this.handleChange} type="text" placeholder="Enter Username" />
    </Form.Group>
   <Form.Group >
      <Form.Label>Email address</Form.Label>
      <Form.Control value={this.state.email} name='email' onChange={this.handleChange} type="email" placeholder="Enter email" />
     {/* { <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>} */}
    </Form.Group>
    <Form.Group >
      <Form.Label>Password</Form.Label>
      <Form.Control value={this.state.password} name='password' onChange={this.handleChange} type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control value={this.state.confirmPassword} name='confirmPassword' onChange={this.handleChange} type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button onClick={this.handleSubmit} variant="outline-primary" type="submit">
      Submit
    </Button>
  </Form>)
  }
}
const mapDispatchToProps=dispatch=>({
  SIGN_UP:user=>{dispatch(asyncSignUp(user))}
})
export default connect(null,mapDispatchToProps)(SignUp);