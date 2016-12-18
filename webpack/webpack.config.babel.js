const path = require('path');
const webpack = require('webpack');
const compact = require('lodash/compact');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('../package.json');

module.exports = (options) => ({
  /**
   * @see webpack-devtools
   */
  devtool: options.development && 'eval-source-map',

  /**
   * Define webpack entries
   */
  entry: {
    app: compact([
      options.development && 'webpack-hot-middleware/client',
      options.development && 'react-hot-loader/patch',
      './app/index.js'
    ]),
    vendor: ['react', 'react-dom', 'lodash', 'react-router']
  },

  /**
   * Define the output directory
   */
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },

  /**
   *
   */
  plugins: compact([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),

    !options.development && new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(!!options.development),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    options.development && new webpack.HotModuleReplacementPlugin(),
    options.development && new webpack.NoErrorsPlugin(),

    // Minify bundles
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        minimize: !options.development,
        postcss(wp) {
          return [
            require('postcss-import')(),
            require('postcss-cssnext'),
            require('postcss-nested')
          ];
        }
      }
    }),

    // Make a separate css bundle for production
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      disable: !!options.development
    }),

    // build a index.html with assets injected
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
      hash: true,
      favicon: 'app/assets/favicon.ico',
      appName: packageJson.name
    })
  ]),

  resolve: {
    modules: [
      path.resolve(__dirname, '../'),
      'node_modules'
    ],
    extensions: ['.js', '.json']
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, '../app')
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader']
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: [
        'style-loader', {
          loader: 'css-loader',
          query: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        },
        'postcss-loader'
      ]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(png|jpg|mp4|webm)/,
      loader: 'url-loader',
      query: {
        limit: 8192
      }
    }]
  },

  target: 'web'
});
