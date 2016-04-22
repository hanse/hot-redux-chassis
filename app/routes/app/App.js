/** @flow */

import './App.css';
import React, { Component } from 'react';
import Header from 'app/components/Header/Header';

type Props = {
  children: any;
  fetchUserProfile: () => any;
};

export default class App extends Component {
  props: Props;

  componentDidMount() {
    this.props.fetchUserProfile();
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
