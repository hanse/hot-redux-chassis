import { connect } from 'react-redux';
import Dashboard from './components/Dashboard';
import { login, logout } from 'app/actions/auth';

function mapStateToProps(state) {
  return {
    username: state.auth.get('username'),
    isLoggedIn: !!state.auth.get('token')
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
