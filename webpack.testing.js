const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  watch: false,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './'
  }
});