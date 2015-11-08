'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config');

var config = Object.create(baseConfig);
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    // compressor: {
    //   screw_ie8: true,
    //   warnings: true
    // }
  })
];

module.exports = config;