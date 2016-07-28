import { connect } from 'react-redux';
import App from './App';
import { rehydrateAuth, isLoggedIn, selectCurrentUsername } from 'app/state/auth';

const mapStateToProps = (state) => ({
  username: selectCurrentUsername(state),
  isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = {
  rehydrateAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
