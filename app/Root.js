// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import history from 'history';
import Router from 'app/routes';
import type { Store } from './types';

type Props = {
  store: Store,
  history: typeof history
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider {...{ store }}>
        <Router history={history} />
      </Provider>
    );
  }
}
