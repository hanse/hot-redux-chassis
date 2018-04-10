const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const packageJson = require('../package.json');

const dllConfig = packageJson.dllConfig;
const compact = filterable => filterable.filter(Boolean);

module.exports = options => ({
  mode: options.development ? 'development' : 'production',
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

  optimization: {
    minimize: !options.development,
    ...(options.development
      ? {}
      : {
          splitChunks: {
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].js'
          }
        })
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
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.UNSPLASH_APPLICATION_ID': JSON.stringify(
          process.env.UNSPLASH_APPLICATION_ID
        )
      }),

      options.development && new FriendlyErrorsPlugin(),
      options.development && new webpack.HotModuleReplacementPlugin(),

      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: !options.development
        }
      }),

      // Make a separate css bundle for production
      new ExtractTextPlugin({
        filename: '[name].[md5:contenthash:hex:8].css',
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
    modules: [path.resolve(__dirname, '../'), 'node_modules']
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
                  require('postcss-import')(), // eslint-disable-line
                  require('postcss-cssnext'), // eslint-disable-line
                  require('postcss-nested') // eslint-disable-line
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
  if (!options.development) {
    return [];
  }

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
      manifest: require(manifestPath) // eslint-disable-line
    })
  ];
}
