const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('../package.json');

const dllConfig = packageJson.dllConfig;
const compact = filterable => filterable.filter(Boolean);

module.exports = options => ({
  /**
   * @see webpack-devtools
   */
  devtool: options.development && 'cheap-module-eval-source-map',

  /**
   * Define webpack entries
   */
  entry: {
    app: compact([
      options.development && 'webpack-hot-middleware/client',
      options.development && 'react-hot-loader/patch',
      './app/index.js'
    ]),
    vendor: ['react', 'react-dom', 'react-router']
  },

  /**
   * Define the output directory
   */
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },

  /**
   *
   */
  plugins: getDependencyHandlers(options).concat(
    compact([
      !options.development && new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),

      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(!!options.development),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),

      options.development && new webpack.HotModuleReplacementPlugin(),
      options.development && new webpack.NoEmitOnErrorsPlugin(),

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
          minimize: !options.development
        }
      }),

      // Make a separate css bundle for production
      new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css',
        allChunks: true,
        disable: !!options.development
      }),

      // build a index.html with assets injected
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        inject: true,
        hash: true,
        favicon: 'app/assets/favicon.ico',
        appName: packageJson.name,
        isDevelopment: options.development
      })
    ])
  ),

  resolve: {
    modules: [path.resolve(__dirname, '../'), 'node_modules'],
    extensions: ['.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(process.cwd(), 'app'),
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-import')(),
                  require('postcss-cssnext'),
                  require('postcss-nested')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|mp4|webm)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  target: 'web'
});

function getDependencyHandlers(options) {
  //if (!options.development) {
  return [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].js'
    })
  ];
  //}

  const dllPath = path.resolve(process.cwd(), dllConfig.path);
  const manifestPath = path.resolve(dllPath, 'vendors.json');

  if (!fs.existsSync(manifestPath)) {
    console.error(
      'The DLL manifest is missing. Please run `yarn run build:dll`'
    );
    process.exit(0);
  }

  return [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath)
    })
  ];
}
