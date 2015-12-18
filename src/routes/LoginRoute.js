import { connect } from 'react-redux';
import Login from '../components/Login';
import { login, logout } from '../actions/auth';

export default connect(() => ({
}), {
  login,
  logout
})(Login);
