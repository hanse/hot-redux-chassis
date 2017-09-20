// @flow

import React, { Component } from 'react';
import Button from 'app/components/Button';
import Input from 'app/components/Input';

type Props = {
  onSubmit: (username: string, password: string) => void
};

type State = {
  username: string,
  password: string
};

export default class LoginForm extends Component<Props, State> {
  state = {
    username: '',
    password: ''
  };

  handleSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password);
  };

  handleChange = (field: string) => (e: SyntheticInputEvent<*>) => {
    this.setState({ [field]: e.target.value });
  };

  handleChangeUsername = this.handleChange('username');
  handleChangePassword = this.handleChange('password');

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChangeUsername}
        />

        <Input
          type="password"
          placeholder="password"
          onChange={this.handleChangePassword}
        />

        <Button type="submit" block>
          Login
        </Button>
      </form>
    );
  }
}
