import { connect } from 'react-redux';
import App from '../components/App';
import { fetchUserProfile } from '../actions/auth';

export default connect(state => ({
  username: state.auth.get('username'),
  isLoggedIn: !!state.auth.get('token')
}), {
  fetchUserProfile
})(App);
