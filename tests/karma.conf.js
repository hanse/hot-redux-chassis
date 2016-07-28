const webpackConfig = require('../webpack/webpack.test.babel.js');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    reporters: ['mocha'],
    browsers: ['Chrome'],
    autoWatch: false,
    singleRun: true,
    files: [{
      pattern: './bundler.js',
      watched: false,
      served: true,
      included: true
    }],
    preprocessors: {
      './bundler.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
