// @flow

import './App.css';
import React, { useEffect, type Node } from 'react';
import { connect } from 'react-redux';
import {
  rehydrateAuth,
  isLoggedIn,
  selectCurrentUsername
} from 'app/state/auth';
import { closeSearch, openSearch } from 'app/state/ui';
import Header from 'app/components/Header';
import type { State } from 'app/types';

type Props = {
  children: Node,
  rehydrateAuth: () => any,
  searchOpen: boolean,
  closeSearch: () => any,
  openSearch: () => any,
  location: Object
};

function App(props: Props) {
  useEffect(() => {
    props.rehydrateAuth();
  }, []);

  return (
    <div>
      <Header
        searchOpen={props.searchOpen}
        closeSearch={props.closeSearch}
        openSearch={props.openSearch}
        location={props.location}
      />
      {props.children}
    </div>
  );
}

const mapStateToProps = (state: State) => ({
  username: selectCurrentUsername(state),
  isLoggedIn: isLoggedIn(state),
  searchOpen: state.ui.searchOpen,
  location: state.router.location
});

const mapDispatchToProps = {
  rehydrateAuth,
  closeSearch,
  openSearch
};

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  mapDispatchToProps
)(App);
