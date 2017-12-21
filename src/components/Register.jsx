/*
 * Register.jsx
 */

import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
        user: {
            ...user,
            [name]: value
        }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.username && user.password && user.email) {
        dispatch(userActions.register(user));
        this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
          <Form onChange={this.handleChange} onSubmit={this.handleSubmit} >
            <Form.Field>
              <label>First Name</label>
              <input name='firstName' placeholder='First Name' required='true'/>
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input name='lastName' placeholder='Last Name' required='true'/>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input name='email' placeholder='Email' required='true'/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name='password' placeholder='Password' type='password'required='true'/>
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input name='username' placeholder='Username' required='true'/>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      registering: state.UserReducer.registering,
      registeredUser: state.UserReducer.registeredUser
  };
}

export default connect(mapStateToProps)(RegisterPage);
