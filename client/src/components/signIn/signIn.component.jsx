import React from 'react';
import { connect } from 'react-redux';
import {Form,Button} from 'react-bootstrap'
import { asyncLogIn } from '../../redux/users/users.actions';
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
          <Button onClick={this.handleSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
    );
  }
}
const mapDispatchToProps=dispatch=>({
  LOGIN:user=>{dispatch(asyncLogIn(user))}
})
export default connect(null,mapDispatchToProps)(SignIn);