/** @flow */

import styles from './Login.css';
import React, { Component } from 'react';
import LoginForm from 'app/components/LoginForm';

type Props = {
  login: () => any;
  location: any;
};

export default class Login extends Component {
  props: Props;

  handleLogin: (u: string, p: string) => void = (username, password) => {
    this.props.login(username, password, this.props.location.query.next);
  };

  render() {
    return (
      <div className={styles.root}>
        <h2>Welcome, please sign in</h2>
        <div className={styles.form}>
          <LoginForm onSubmit={this.handleLogin} />
        </div>
        <p>Sign up is currently not available.</p>
      </div>
    );
  }
}
