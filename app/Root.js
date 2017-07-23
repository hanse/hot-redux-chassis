// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from 'app/routes';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider {...{ store }}>
        <Router history={history} />
      </Provider>
    );
  }
}
