import path from 'path';
import webpack from 'webpack';
import compact from 'lodash/compact';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const cssLoader = 'css?modules&&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'; // eslint-disable-line

export default {
  /**
   * @see webpack-devtools
   */
  devtool: isDevelopment && 'eval-source-map',

  /**
   * Define webpack entries
   */
  entry: {
    app: compact([
      isDevelopment && 'webpack-hot-middleware/client',
      './app/index.js'
    ]),
    vendor: ['react', 'react-dom']
  },

  /**
   * Define the output directory
   */
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: ''
  },

  /**
   *
   */
  plugins: compact([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,
      filename: 'vendor.bundle.js'
    }),

    isProduction && new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(!isProduction),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new webpack.NoErrorsPlugin(),

    // Minify bundles
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
      inject: true,
      favicon: 'app/assets/favicon.ico'
    })
  ]),

  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ],
    extensions: ['.js'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: isProduction
          ? ExtractTextPlugin.extract('style', cssLoader)
          : `style!${cssLoader}`
      },
      {
        test: /\.(png|jpg)/,
        loader: 'url-loader?limit=8192'
      }
    ],
  },

  postcss(wp) {
    return [
      require('postcss-import')({ addDependencyTo: wp }),
      require('postcss-cssnext'),
      require('postcss-nested')
    ];
  }
};
