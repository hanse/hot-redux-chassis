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
          <div>
            <p>Hello, we decided to put a login form here as well</p>
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
