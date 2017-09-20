// @flow

import styles from './Dashboard.css';
import React, { Component } from 'react';
import ballmer from 'app/assets/ballmer.jpg';
import LoginForm from 'app/components/LoginForm';
import MessageBox from 'app/components/MessageBox';
import Button from 'app/components/Button';
import Feed from './Feed';

type Props = {
  username: string,
  isLoggedIn: boolean,
  login: () => void,
  logout: () => void,
  clearLoginError: () => void,
  loginFailed: boolean
};

export default class Dashboard extends Component<Props> {
  render() {
    return (
      <div className={styles.root}>
        {this.props.isLoggedIn && <h2>{`Hello, ${this.props.username}!`}</h2>}

        {!this.props.isLoggedIn && (
          <div className={styles.loginContainer}>
            {this.props.loginFailed && (
              <MessageBox
                message="The login details were not correct"
                type="error"
                onClose={this.props.clearLoginError}
              />
            )}
            <LoginForm onSubmit={this.props.login} />
          </div>
        )}

        {this.props.isLoggedIn && (
          <div>
            <Button onClick={this.props.logout}>Log out</Button>
            <img src={ballmer} alt="Steve Ballmer" />
          </div>
        )}

        <Feed />
      </div>
    );
  }
}
