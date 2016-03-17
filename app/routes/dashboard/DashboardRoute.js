import { connect } from 'react-redux';
import Dashboard from './components/Dashboard';
import { login, logout } from 'app/actions/auth';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  login,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
