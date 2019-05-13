'use strict';

const path = require('path');
const fs = require('fs-extra');
const exec = require('child-process-promise').exec;

const rootDirectory = fs.realpathSync(process.cwd());

const resolveRoot = (relativePath = '') =>
  path.resolve(rootDirectory, relativePath);

const getLernaPackagesAsync = async () => {
  return exec('node node_modules/lerna/cli.js ls --loglevel silent').then(
    result => {
      return result.stdout.split('\n').filter(Boolean);
    }
  );
};

const cleanPackageAsync = name => {
  return fs.remove(resolveRoot(`packages/${name}/dist`));
};

module.exports = {
  resolveRoot,
  cleanPackageAsync,
  getLernaPackagesAsync
};
