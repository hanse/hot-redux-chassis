/** @flow */

import styles from './Dashboard.css';
import React, { Component } from 'react';
import ballmer from 'app/assets/ballmer.jpg';
import LoginForm from 'app/components/LoginForm/LoginForm';

type Props = {
  username: string;
  isLoggedIn: boolean;
  login: () => any;
  logout: () => any;
};

export default class Dashboard extends Component {
  props: Props;

  render() {
    return (
      <div className={styles.root}>
        {this.props.isLoggedIn && <h2>{`Hello, ${this.props.username}!`}</h2>}

        {!this.props.isLoggedIn && (
          <div className={styles.loginContainer}>
            {this.props.loginFailed && (
              <p style={{ color: '#ad1d13', fontWeight: 700 }}>The login details were not correct.</p>
            )}
            <LoginForm
              onSubmit={this.props.login}
            />
          </div>
        )}

        {this.props.isLoggedIn && (
          <div>
            <button onClick={this.props.logout}>Log out</button>
            <div><img src={ballmer} alt='Steve Ballmer' /></div>
          </div>
        )}
      </div>
    );
  }
}
