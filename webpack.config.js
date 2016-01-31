const path = require('path');
const NGAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname + '/client/app'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname + '/client/public'),
    filename: './js/app.js',
    publicPath: '/'
  },
  plugins: [
    new NGAnnotatePlugin({
        add: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
};
