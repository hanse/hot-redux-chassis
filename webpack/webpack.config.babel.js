const path = require('path');
const webpack = require('webpack');
const compact = require('lodash/compact');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const modules = [
  path.resolve(__dirname, '../'),
  'node_modules'
];

module.exports = (options) => {
  return {
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
        minimize: true,
        debug: false
      }),

      // Make a separate css bundle for production
      new ExtractTextPlugin('bundle.css', {
        allChunks: true,
        disable: !!options.development
      }),

      // build a index.html with assets injected
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        inject: true,
        favicon: 'app/assets/favicon.ico'
      })
    ]),

    resolve: {
      modulesDirectory: modules,
      modules,
      extensions: ['', '.js', '.json']
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: path.join(__dirname, '../app')
        },
        {
          test: /\.css$/,
          loaders: [
            'style',
            {
              loader: 'css',
              query: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'postcss'
          ]
        },
        {
          test: /\.(png|jpg)/,
          loader: 'url',
          query: {
            limit: 8192
          }
        }
      ]
    },

    target: 'web',

    postcss(wp) {
      return [
        require('postcss-import')({ addDependencyTo: wp }),
        require('postcss-cssnext'),
        require('postcss-nested')
      ];
    }
  };
};
