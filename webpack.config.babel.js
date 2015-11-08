import path from 'path';
import webpack from 'webpack';
import compact from 'lodash/array/compact';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

export default {
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
      inject: true
    })
  ]),

  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx', '.css', '.png', '.jpg']
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
