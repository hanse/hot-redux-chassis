/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const createWebpackMiddleware = require('webpack-express-middleware');
const auth = require('./auth');
const search = require('./search');

const config = require('../webpack/webpack.config.babel')({
  development: process.env.NODE_ENV === 'development'
});

const compiler = require('webpack')(config);

const webpackMiddleware = createWebpackMiddleware(compiler, config);

const app = express();

app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use('/api/auth', auth);
app.use('/api/search', search);

webpackMiddleware(app);

app.listen(app.get('port'), app.get('host'), webpackMiddleware.listen);
