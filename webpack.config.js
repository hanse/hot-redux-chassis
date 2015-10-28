/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var compact = require('lodash/array/compact');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Define some globals that can be used in the app code.
 * E.g. if (__DEV__) devTool();
 */
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(!isProduction),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});


module.exports = {
  /**
   * @see webpack-devtools
   */
  devtool: isDevelopment && 'eval-source-map',

  /**
   * Define webpack entries
   */
  entry: compact([
    isDevelopment && 'webpack-hot-middleware/client',
    './src/index.js'
  ]),

  /**
   * Define the output directory
   */
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },

  /**
   *
   */
  plugins: compact([
    isProduction && new webpack.optimize.OccurenceOrderPlugin(),
    definePlugin,

    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new webpack.NoErrorsPlugin(),

    isProduction && new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // Make a separate css bundle for production
    isProduction && new ExtractTextPlugin('bundle.css', {
      allChunks: true
    }),

    // build a index.html with assets injected
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    })
  ]),

  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: isProduction ? ExtractTextPlugin.extract('style', 'css!postcss') : 'style!css!postcss'
      }
    ],
  },
  postcss: function(webpack) {
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-cssnext'),
      require('postcss-nested')
    ];
  }
};
