import { connect } from 'react-redux';
import App from './App';
import { fetchUserProfile } from 'app/state/auth';
import { isLoggedIn, selectCurrentUsername } from 'app/state/auth';

const mapStateToProps = (state) => ({
  username: selectCurrentUsername(state),
  isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = {
  fetchUserProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
