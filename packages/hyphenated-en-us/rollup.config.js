'use strict';

const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const pkg = require('./package.json');
const babelConfig = require('../../babel.config.js');

module.exports = {
  input: path.resolve(__dirname, 'src/index.js'),
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [resolve(), babel({ exclude: 'node_modules/**', ...babelConfig })]
};
