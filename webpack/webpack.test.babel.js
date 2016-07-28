const path = require('path');
const webpack = require('webpack');

const modules = [
  path.resolve(__dirname, '../'),
  'node_modules'
];

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'null-loader' },
      // https://github.com/webpack/webpack/issues/304
      { test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      },
      { test: /\.js$/, loader: 'babel', exclude: [/node_modules/] },
      { test: /\.jpe?g$|\.gif$|\.png$/i, loader: 'null-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      __DEV__: 'true'
    })
  ],
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: {
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  },
  resolve: {
    modulesDirectory: modules,
    modules,
    extensions: ['', '.js', '.json'],
    alias: {
      sinon: 'sinon/pkg/sinon'
    }
  }
};
