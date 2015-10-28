import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

@connect(state => state)
export default class DashboardRoute extends Component {
  render() {
    return <Dashboard {...this.props} />;
  }
}
