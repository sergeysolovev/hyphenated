'use strict';

const path = require('path');
const fs = require('fs-extra');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const chalk = require('chalk');

const rootDirectory = fs.realpathSync(process.cwd());

const resolveRoot = (relativePath = '') =>
  path.resolve(rootDirectory, relativePath);

const babelConfig = require(resolveRoot('babel.config.js'));

const packages = [
  { name: 'hyphenated', external: ['hyphenated-en-us'] },
  { name: 'hyphenated-de' },
  { name: 'hyphenated-en-gb' },
  { name: 'hyphenated-en-us' },
  { name: 'hyphenated-fr' }
];

const buildPackage = async ({ name, external }) => {
  const resolvePackage = relativePath => {
    return resolveRoot(`packages/${name}/${relativePath}`);
  };
  const resolveNodeModule = relativePath => {
    return resolveRoot(`build/node_modules/${name}/${relativePath}`);
  };
  const entry = resolvePackage('src/index.js');
  const rollupConfig = {
    input: entry,
    external: external,
    plugins: [
      resolve(),
      babel({ exclude: '**/node_modules/**', ...babelConfig })
    ]
  };
  const outputOptions = {
    file: resolveNodeModule(`${name}.cjs.js`),
    format: 'cjs'
  };
  console.log(chalk.bgYellow.black(' BUILDING ') + ' ' + name);
  const bundle = await rollup.rollup(rollupConfig);
  await bundle.write(outputOptions);
  await Promise.all([
    fs.copy(resolvePackage('LICENSE'), resolveNodeModule('LICENSE')),
    fs.copy(resolvePackage('README.md'), resolveNodeModule('README.md')),
    fs.copy(resolvePackage('package.json'), resolveNodeModule('package.json')),
    fs.copy(resolvePackage('public'), resolveNodeModule('.'))
  ]);
  console.log(chalk.bgGreen.black(' COMPLETE ') + ' ' + name + '\n');
};

const buildAll = async () => {
  await fs.remove(resolveRoot('build'));
  for (const pkg of packages) {
    await buildPackage(pkg);
  }
};

buildAll();
