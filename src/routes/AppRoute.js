import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

@connect(state => ({
  username: state.auth.get('username')
}))
export default class AppRoute extends Component {
  render() {
    return <App {...this.props} />;
  }
}
