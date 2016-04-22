/** @flow */

import React, { PropTypes, Component } from 'react';

type Props = {
  onSubmit: (u: string, p: string) => any;
};

type State = {
  username: string;
  password: string;
}

type EventHandler = (e: SyntheticEvent) => void;

export default class LoginForm extends Component {
  props: Props;

  state: State = {
    username: '',
    password: ''
  };

  handleSubmit: EventHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.onSubmit(
      this.state.username,
      this.state.password
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='username'
          onChange={(e) => this.setState({ username: e.target.value })}
        />

        <input
          type='password'
          placeholder='password'
          onChange={(e) => this.setState({ password: e.target.value })}
        />

        <button type='submit'>Login</button>
      </form>
    );
  }
}
