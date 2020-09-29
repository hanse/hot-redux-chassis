import Router from 'app/routes';
import React, { StrictMode, Suspense } from 'react';
import { Provider } from 'react-redux';

import { Store } from './types';

type Props = {
  store: Store;
  history: any;
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
