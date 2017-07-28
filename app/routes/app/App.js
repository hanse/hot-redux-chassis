// @flow

import './App.css';
import React, { Component } from 'react';
import Header from 'app/components/Header';

type Props = {
  children: any,
  rehydrateAuth: () => any,
  searchOpen: boolean,
  location: Object
};

export default class App extends Component {
  props: Props;

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
