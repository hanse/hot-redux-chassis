import { loadRoute, loadingError } from 'app/routes';

export default {
  path: 'about',
  getComponent(location, cb) {
    System.import('./AboutRoute')
      .then(loadRoute(cb))
      .catch(loadingError);
  }
};
