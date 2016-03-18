import { loadRoute, loadingError } from 'app/routes';

export default {
  path: 'contact',
  getComponent(location, cb) {
    System.import('./ContactRoute')
      .then(loadRoute(cb))
      .catch(loadingError);
  }
};
