'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: 'app',
  module: {
    loaders: [
      { test: /.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    path: path.join(__dirname, './public/js'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js']
  }
}