import React from 'react';
import { IndexRoute, Route } from 'react-router';
import DashboardRoute from 'app/routes/DashboardRoute';
import AboutRoute from 'app/routes/AboutRoute';
import ContactRoute from 'app/routes/ContactRoute';
import LoginRoute from 'app/routes/LoginRoute';
import AppRoute from 'app/routes/AppRoute';
import requireAuth from 'app/utils/requireAuth';

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
