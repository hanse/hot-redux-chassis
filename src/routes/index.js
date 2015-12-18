import React from 'react';
import { IndexRoute, Route } from 'react-router';
import DashboardRoute from '../routes/DashboardRoute';
import AboutRoute from '../routes/AboutRoute';
import ContactRoute from '../routes/ContactRoute';
import AppRoute from '../routes/AppRoute';

const NotFound = () => (
  <h1>Not Found</h1>
);

export default (
  <Route path='/' component={AppRoute}>
    <IndexRoute component={DashboardRoute} />

    <Route path='about' component={AboutRoute} />
    <Route path='contact' component={ContactRoute} />

    <Route path='*' component={NotFound} />
  </Route>
);
