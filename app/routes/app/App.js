/** @flow */

import './App.css';
import React, { Component } from 'react';
import Header from 'app/components/Header/Header';

type Props = {
  children: any;
  rehydrateAuth: () => any;
};

export default class App extends Component {
  props: Props;

  componentDidMount() {
    this.props.rehydrateAuth();
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
