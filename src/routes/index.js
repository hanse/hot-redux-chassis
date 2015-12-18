import React from 'react';
import { IndexRoute, Route } from 'react-router';
import DashboardRoute from '../routes/DashboardRoute';
import AboutRoute from '../routes/AboutRoute';
import ContactRoute from '../routes/ContactRoute';
import LoginRoute from '../routes/LoginRoute';
import AppRoute from '../routes/AppRoute';
import requireAuth from '../utils/requireAuth';

const NotFound = () => (
  <h1>Not Found</h1>
);

export default (
  <Route path='/' component={AppRoute}>
    <IndexRoute component={DashboardRoute} />

    <Route path='about' component={AboutRoute} />
    <Route path='contact' component={requireAuth(ContactRoute)} />
    <Route path='login' component={LoginRoute} />

    <Route path='*' component={NotFound} />
  </Route>
);
