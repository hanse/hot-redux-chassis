// @flow

import './App.css';
import React, { Component } from 'react';
import Header from 'app/components/Header';

type Props = {
  children: any,
  rehydrateAuth: () => any,
  searchOpen: boolean,
  toggleSearch: () => void,
  location: Object
};

export default class App extends Component {
  props: Props;

  componentDidMount() {
    this.props.rehydrateAuth();
  }

  render() {
    return (
      <div style={{ WebkitFilter: this.props.searchOpen ? 'blur(7px)' : null }}>
        <Header
          searchOpen={this.props.searchOpen}
          toggleSearch={this.props.toggleSearch}
          location={this.props.location}
        />
        {this.props.children}
      </div>
    );
  }
}
