// @flow

import React, { StrictMode, Suspense } from 'react';
import { Provider } from 'react-redux';
import history from 'history';
import Router from 'app/routes';
import type { Store } from './types';

type Props = {
  store: Store,
  history: typeof history
};

function Root({ store, history }: Props) {
  return (
    <StrictMode>
      <Suspense fallback={<div />}>
        <Provider {...{ store }}>
          <Router history={history} />
        </Provider>
      </Suspense>
    </StrictMode>
  );
}

export default Root;
