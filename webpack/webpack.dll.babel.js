const path = require('path');
const webpack = require('webpack');

const packageJson = require(path.join(process.cwd(), 'package.json')); // eslint-disable-line

const dllConfig = packageJson.dllConfig;

if (!dllConfig) {
  console.error('dllConfig missing from package.json');
  process.exit(0);
}

const outputPath = path.join(process.cwd(), dllConfig.path);
const exclude = (iterable, exclude = []) =>
  iterable.filter(item => !exclude.includes(item));
const vendors = Object.keys(packageJson.dependencies);

module.exports = () => ({
  context: process.cwd(),
  devtool: 'eval',
  entry: {
    vendors: exclude(vendors, dllConfig.exclude)
  },
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(outputPath, '[name].json')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
});
