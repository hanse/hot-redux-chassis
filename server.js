const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const config = require('./webpack/webpack.config.babel')({
  development: process.env.NODE_ENV === 'development'
});

const app = express();

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  const compiler = require('webpack')(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/api', jsonServer.router('tests/db.json'));

app.post('/auth/login', (req, res) => {
  const body = req.body;
  if (body.username === 'admin' && body.password === 'admin') {
    return res.send({
      token: '12345'
    });
  }
  return res.sendStatus(401);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(app.get('port'), app.get('host'), (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
  } else {
    console.log('Development server listening on %s:%s', app.get('host'), app.get('port')); // eslint-disable-line
  }
});
