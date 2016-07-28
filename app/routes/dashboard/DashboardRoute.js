/** @flow */

import { connect } from 'react-redux';
import Dashboard from './components/Dashboard';
import { login, logout } from 'app/state/auth';

function mapStateToProps(state) {
  return {
    username: state.auth.get('username'),
    isLoggedIn: !!state.auth.get('token'),
    loginFailed: state.auth.get('failed')
  };
}

const mapDispatchToProps = {
  login,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
