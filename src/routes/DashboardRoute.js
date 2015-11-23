import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { login, logout } from '../actions/auth';

export default connect(() => ({
}), {
  login,
  logout
})(Dashboard);
