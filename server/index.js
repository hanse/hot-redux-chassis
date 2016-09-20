/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const chalk = require('chalk');
const auth = require('./auth');

const config = require('../webpack/webpack.config.babel')({
  development: process.env.NODE_ENV === 'development'
});

const app = express();

app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use('/api', jsonServer.router('tests/db.json'));
app.use('/auth', auth);

function clearConsole() {
  process.stdout.write('\x1bc');
}

function createLogger(colors, defaultLevel = 'info') {
  const log = (level, message) => {
    const label = `[${level.toUpperCase()}]`;
    const colorize = colors[level] || colors[defaultLevel];
    console.log(colorize(label), message);
  };

  Object.keys(colors).forEach((color) => {
    log[color] = log.bind(null, color);
  });

  return log;
}

const log = createLogger({
  info: chalk.cyan,
  warning: chalk.yellow,
  error: chalk.red
});

function formatMessage(message) {
  return message
    .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
    .replace('./~/css-loader!./~/postcss-loader!', '');
}

if (process.env.NODE_ENV !== 'production') {
  const compiler = require('webpack')(config);

  compiler.plugin('invalid', () => {
    log.info(chalk.yellow('Compiling assets...'));
  });

  compiler.plugin('done', (stats) => {
    const hasErrors = stats.hasErrors();
    const hasWarnings = stats.hasWarnings();

    if (!hasErrors && !hasWarnings) {
      log.info(chalk.green(`Assets compiled in ${stats.endTime - stats.startTime} ms`));
      return;
    }

    const json = stats.toJson();
    console.log(json)

    const formattedErrors = json.errors.map(
      (message) => `Error in ${formatMessage(message)}`
    );

    const formattedWarnings = json.warnings.map(
      (message) => `Warning in ${formatMessage(message)}`
    );

    if (hasErrors) {
      log.error('Failed to compile assets');
      formattedErrors.forEach((message) => {
        console.log(message);
        console.log();
      });
      return;
    }

    if (hasWarnings) {
      log.warning('Compiled assets with warnings');
      formattedWarnings.forEach((message) => {
        console.log(message);
        console.log();
      });
    }
  });

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    quiet: true
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: false
  }));

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
  app.use(express.static(config.output.path));
  app.use((req, res) => {
    res.sendFile(`${config.output.path}/index.html`);
  });
}

app.listen(app.get('port'), app.get('host'), (err) => {
  clearConsole();
  if (err) {
    log.error(err);
  } else {
    log.info(`Server listening on localhost:${app.get('port')}`);
    log.info(`NODE_ENV=${process.env.NODE_ENV}`);

    if (!process.env.NODE_ENV) {
      log.warning(
        `NODE_ENV is not set. Please put ${chalk.cyan('export NODE_ENV=development')} in your shell config.` // eslint-disable-line
      );
    }
  }
});
