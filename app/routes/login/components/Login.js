import styles from './Login.css';
import React, { PropTypes, Component } from 'react';
import LoginForm from 'app/components/LoginForm/LoginForm';

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
      <div className={styles.root}>
        <h2>Welcome, please sign in</h2>
        <div className={styles.form}>
          <LoginForm onSubmit={::this.handleLogin} />
        </div>
        <p>Sign up is currently not available.</p>
      </div>
    );
  }
}
