var webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  output: {
    path: __dirname + "/build/",
    filename: "browser.min.js"
  }
};