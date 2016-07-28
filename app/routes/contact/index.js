/** @flow */

import { loadRoute, loadingError } from 'app/routes';
import type { AsyncRoute } from 'app/routes';

export default ({
  path: 'contact',
  getComponent(location, cb) {
    System.import('./ContactRoute')
      .then(loadRoute(cb))
      .catch(loadingError);
  }
}: AsyncRoute);
