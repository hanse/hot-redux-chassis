import React from 'react';
import root from './root/AppRoute';
import dashboard from './dashboard';
import contact from './contact';
import about from './about';
import login from './login';

export default {
  path: '/',
  component: root,
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
