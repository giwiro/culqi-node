'use strict';

const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');

const distPath = path.resolve(__dirname, '../dist');
const distPackageJsonPath = path.resolve(distPath, 'package.json');

const { scripts, devDependencies, ...packageData } = packageJson;

const newPackageData = {
  ...packageData,
};

// Write package json to dist folder
fs.writeFileSync(distPackageJsonPath, JSON.stringify(newPackageData, null, 2), 'utf8');

// Copy README
fs.copyFileSync(
  path.resolve(__dirname, '../README.md'),
  path.resolve(distPath, 'README.md')
);
