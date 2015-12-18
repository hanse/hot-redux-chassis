import './Login.css';
import React, { PropTypes, Component } from 'react';
import LoginForm from './LoginForm';

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  handleLogin(username, password) {
    this.props.login(username, password, this.props.location.query.next);
  }

  render() {
    return (
      <div className='Login'>
        <h1>Welcome, please sign in</h1>
        <div className='Login__form'>
          <LoginForm onSubmit={::this.handleLogin} />
        </div>
        <p>Sign up is currently not available.</p>
      </div>
    );
  }
}
