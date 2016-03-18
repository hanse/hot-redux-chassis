import React from 'react';
import app from './app/AppRoute';
import dashboard from './dashboard';
import contact from './contact';
import about from './about';
import login from './login';

export function loadRoute(callback) {
  return (module) => callback(null, module.default);
}

export function loadingError(err) {
  console.error('Loading error', err); // eslint-disable-line
}

export default {
  path: '/',
  component: app,
  indexRoute: dashboard,
  childRoutes: [
    about,
    contact,
    login,
    {
      path: '*',
      component: () => <div>Not Found</div>
    }
  ]
};