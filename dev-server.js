import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config';

const app = express();
const compiler = webpack(config);

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

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
