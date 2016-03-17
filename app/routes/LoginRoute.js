import { connect } from 'react-redux';
import Login from 'app/components/Login';
import { login, logout } from 'app/actions/auth';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  login,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
