import { connect } from 'react-redux';
import Dashboard from 'app/components/Dashboard';
import { login, logout } from 'app/actions/auth';

export default connect(() => ({
}), {
  login,
  logout
})(Dashboard);
