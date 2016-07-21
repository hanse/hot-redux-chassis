const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const uuid = require('node-uuid');

const config = require('./webpack/webpack.config.babel')({
  development: process.env.NODE_ENV === 'development'
});

const app = express();

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

if (!process.env.NODE_ENV) {
  console.log('NODE_ENV is not set, please put export NODE_ENV=development in your shell config.');
}

if (process.env.NODE_ENV === 'development') {
  const compiler = require('webpack')(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

const users = [{
  id: 1,
  username: 'admin',
  password: 'admin',
}];

const tokens = {};

app.use('/api', jsonServer.router('tests/db.json'));

app.get('/users/me', (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: 'Missing authorization header' });
  }

  const token = authorization.split(' ')[1];

  if (!tokens[token]) {
    return res.status(401).send({ error: 'Invalid token' });
  }

  const userId = tokens[token];
  const user = users.find((user) => user.id === userId);

  res.send({
    id: user.id,
    username: user.username
  });
});

app.post('/auth/login', (req, res) => {
  const body = req.body;

  const user = users.find((user) =>
    user.username === body.username && user.password === body.password
  );

  if (!user) {
    return res.status(401).send({
      error: 'Invalid credentials'
    });
  }

  const token = uuid.v4();
  tokens[token] = user.id;

  res.send({
    token
  });
});

if (process.env.NODE_ENV !== 'production') {
  const compiler = require('webpack')(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.use((req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }

      res.set('Content-Type', 'text/html');
      res.send(result);
    });
  });
}

app.listen(app.get('port'), app.get('host'), (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
  } else {
    console.log('Development server listening on %s:%s', app.get('host'), app.get('port')); // eslint-disable-line
  }
});
