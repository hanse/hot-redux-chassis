// @flow

import { connect } from 'react-redux';
import App from './App.js';
import {
  rehydrateAuth,
  isLoggedIn,
  selectCurrentUsername
} from 'app/state/auth';
import { toggleSearch } from 'app/state/ui';
import type { State } from 'app/types';

const mapStateToProps = (state: State) => ({
  username: selectCurrentUsername(state),
  isLoggedIn: isLoggedIn(state),
  searchOpen: state.ui.get('searchOpen')
});

const mapDispatchToProps = {
  rehydrateAuth,
  toggleSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
