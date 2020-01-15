import { connect } from 'react-redux';
import Dashboard from './components/Dashboard';
import { login, logout, clearLoginError, isLoggedIn } from 'app/state/auth';
import { State } from 'app/types';

function mapStateToProps(state: State) {
  return {
    username: state.auth.username,
    isLoggedIn: isLoggedIn(state),
    loginFailed: state.auth.failed
  };
}

const mapDispatchToProps = {
  login,
  logout,
  clearLoginError
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
