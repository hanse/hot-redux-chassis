/** @flow */

import React, { Component } from 'react';
import Button from 'app/components/Button';
import Input from 'app/components/Input';

type Props = {
  onSubmit: (u: string, p: string) => any;
};

type State = {
  username: string;
  password: string;
}

export default class LoginForm extends Component {
  props: Props;

  state: State = {
    username: '',
    password: ''
  };

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.onSubmit(
      this.state.username,
      this.state.password
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => this.setState({ username: e.target.value })}
        />

        <Input
          type="password"
          placeholder="password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />

        <Button type="submit" block>Login</Button>
      </form>
    );
  }
}
