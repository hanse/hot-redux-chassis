// @flow

import AppRoute from './app/AppRoute';
import dashboard from './dashboard';
import contact from './contact';
import about from './about';
import login from './login';
import { NotFound } from './errors';

export type AsyncRoute = {
  path: string,
  getComponent: (location: string, cb: () => any) => void
};

export function loadRoute(callback: () => void) {
  return (module: any) => callback(null, module.default);
}

export function loadingError(err: Error) {
  console.error('Loading error', err); // eslint-disable-line
}

export default {
  path: '/',
  component: AppRoute,
  indexRoute: dashboard,
  childRoutes: [
    about,
    contact,
    login,
    {
      path: '*',
      component: NotFound
    }
  ]
};
