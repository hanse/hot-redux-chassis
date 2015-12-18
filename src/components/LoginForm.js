import React, { PropTypes, Component } from 'react';

export default class LoginForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    username: '',
    password: ''
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(
      this.state.username,
      this.state.password
    );
  }

  render() {
    return (
      <form onSubmit={::this.handleSubmit}>
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

        <button className='Button' type='submit'>Login</button>
      </form>
    );
  }
}
