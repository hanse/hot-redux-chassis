/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');
const search = require('./search');

const webpackConfig = require('../webpack/webpack.config.babel')({
  development: process.env.NODE_ENV === 'development'
});

const compiler = require('webpack')(webpackConfig);

const app = express();

app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use('/api/auth', auth);
app.use('/api/search', search);

app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'silent'
  })
);

app.use(
  require('webpack-hot-middleware')(compiler, {
    log: false
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(webpackConfig.output.path));
  app.use((req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        next(err);
        return;
      }

      res.set('Content-Type', 'text/html');
      res.send(result);
    });
  });
} else {
  app.use(express.static(webpackConfig.output.path));
  app.use((req, res) => {
    res.sendFile(`${webpackConfig.output.path}/index.html`);
  });
}

app.listen(app.get('port'), app.get('host'), err => {
  if (err) {
    console.log(err);
  }
  console.log('App listening on', app.get('port'));
});
