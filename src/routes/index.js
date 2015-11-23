import React from 'react';
import { IndexRoute, Route } from 'react-router';
import DashboardRoute from '../routes/DashboardRoute';
import AboutRoute from '../routes/AboutRoute';
import AppRoute from '../routes/AppRoute';

export default (
  <Route path='/' component={AppRoute}>
    <IndexRoute component={DashboardRoute} />
    <Route path='about' name='About' component={AboutRoute} />
  </Route>
);
