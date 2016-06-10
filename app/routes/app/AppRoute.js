import { connect } from 'react-redux';
import App from './App';
import { fetchUserProfile } from 'app/actions/auth';
import { isLoggedIn, selectCurrentUsername } from 'app/reducers/auth';

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
