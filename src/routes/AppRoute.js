import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

@connect(state => state)
export default class AppRoute extends Component {
  render() {
    return <App {...this.props} />;
  }
}
