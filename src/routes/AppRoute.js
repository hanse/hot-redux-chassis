import { connect } from 'react-redux';
import App from '../components/App';

export default connect(state => ({
  username: state.auth.get('username'),
  isLoggedIn: state.auth.get('token') !== null
}))(App);
