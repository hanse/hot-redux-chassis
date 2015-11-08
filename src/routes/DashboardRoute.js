import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { login, logout } from '../actions/auth';

@connect(null, {
  login, logout
})
export default class DashboardRoute extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.login('admin', 'admin');
    setTimeout(() => this.props.logout(), 5000);
  }

  render() {
    return <Dashboard {...this.props} />;
  }
}
