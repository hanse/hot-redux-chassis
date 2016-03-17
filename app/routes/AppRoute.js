import { connect } from 'react-redux';
import App from 'app/components/App';
import { fetchUserProfile } from 'app/actions/auth';

const mapStateToProps = (state) => ({
  username: state.auth.get('username'),
  isLoggedIn: !!state.auth.get('token')
});

const mapDispatchToProps = {
  fetchUserProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
