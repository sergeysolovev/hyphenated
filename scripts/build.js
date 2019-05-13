'use strict';

const fs = require('fs-extra');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const chalk = require('chalk');
const {
  getLernaPackagesAsync,
  cleanPackageAsync,
  resolveRoot
} = require('./utils');

const babelConfig = require(resolveRoot('babel.config.js'));

const buildPackageAsync = async name => {
  const resolvePackage = relativePath => {
    return resolveRoot(`packages/${name}/${relativePath}`);
  };
  const resolvePackageDist = relativePath => {
    return resolveRoot(`packages/${name}/dist/${relativePath}`);
  };
  const entry = resolvePackage('src/index.js');
  const packageJson = require(resolvePackage('package.json'));
  const rollupConfig = {
    input: entry,
    external: [
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {})
    ],
    plugins: [
      resolve(),
      babel({ exclude: '**/node_modules/**', ...babelConfig })
    ]
  };
  const outputOptions = {
    file: resolvePackageDist(`${name}.cjs.js`),
    format: 'cjs'
  };
  console.log(chalk.bgYellow.black(' BUILDING ') + ' ' + name);
  const bundle = await rollup.rollup(rollupConfig);
  await bundle.write(outputOptions);
  await Promise.all([
    fs.copy(resolvePackage('LICENSE'), resolvePackageDist('LICENSE')),
    fs.copy(resolvePackage('README.md'), resolvePackageDist('README.md')),
    fs.copy(resolvePackage('package.json'), resolvePackageDist('package.json')),
    fs.copy(resolvePackage('public'), resolvePackageDist('.'))
  ]);
  console.log(chalk.bgGreen.black(' COMPLETE ') + ' ' + name + '\n');
};

const buildAll = async () => {
  const packages = await getLernaPackagesAsync();
  for (const pkg of packages) {
    await cleanPackageAsync(pkg);
    await buildPackageAsync(pkg);
  }
};

buildAll();
