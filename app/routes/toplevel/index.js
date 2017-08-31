// @flow

import './App.css';
import React, { Component } from 'react';
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
  children: any,
  rehydrateAuth: () => any,
  searchOpen: boolean,
  closeSearch: () => void,
  openSearch: () => void,
  location: Object
};

class App extends Component<Props> {
  componentDidMount() {
    this.props.rehydrateAuth();
  }

  render() {
    return (
      <div>
        <Header
          searchOpen={this.props.searchOpen}
          closeSearch={this.props.closeSearch}
          openSearch={this.props.openSearch}
          location={this.props.location}
        />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  username: selectCurrentUsername(state),
  isLoggedIn: isLoggedIn(state),
  searchOpen: state.ui.get('searchOpen'),
  location: state.router.location
});

const mapDispatchToProps = {
  rehydrateAuth,
  closeSearch,
  openSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
