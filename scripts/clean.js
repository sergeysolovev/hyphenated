'use strict';

const { getLernaPackagesAsync, cleanPackageAsync } = require('./utils');

const cleanAll = async () => {
  const packages = await getLernaPackagesAsync();
  for (const pkg of packages) {
    await cleanPackageAsync(pkg);
  }
};

cleanAll();
