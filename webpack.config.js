'use strict';
var path = require('paht');
var webpack = require('webpack');

module.exports = {
  //entry
  entry: [
    //React client-side app
    './src/app.js'
  ],
  module: {
    loaders: [
      { test: /.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js']
  }
}