import path from 'path';
import express from 'express';
import config from './webpack.config.babel';

const app = express();

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV === 'development') {
  const compiler = require('webpack')(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), app.get('host'), (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
  } else {
    console.log('Development server listening on %s:%s', app.get('host'), app.get('port')); // eslint-disable-line
  }
});
