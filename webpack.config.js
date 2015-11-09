'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/app',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }
    ],
  },
  output: {
    path: path.join(__dirname, './src/public/js'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js']
  }
};