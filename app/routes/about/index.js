/** @flow */

import { loadRoute, loadingError } from 'app/routes';
import type { AsyncRoute } from 'app/routes';

export default ({
  path: 'about',
  getComponent(location, cb) {
    System.import('./AboutRoute')
      .then(loadRoute(cb))
      .catch(loadingError);
  }
}: AsyncRoute);
