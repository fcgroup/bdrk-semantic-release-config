const fs = require('fs');
const path = require('path');

function findPlugin(plugins, pluginName) {
  // plugins can be a string (just the name) or a tuple of string and configuration object
  const index = plugins.findIndex(plugin =>
    Array.isArray(plugin) ? plugin[0] === pluginName : plugin === pluginName
  );

  if (index >= 0) {
    return plugins[index];
  }
}

function findPackageJson() {
  if (process.env.npm_package_json && fs.existsSync(process.env.npm_package_json)) {
    // from npx
    return process.env.npm_package_json;
  }

  // assume that we are executing in the base of the repo
  const packageJson = path.resolve(process.env.PWD, 'package.json');
  if (fs.existsSync(packageJson)) {
    return packageJson;
  }
}

function getPackageConfig() {
  const packageJson = findPackageJson();
  return require(packageJson);
}

exports.findPackageJson = findPackageJson;
exports.findPlugin = findPlugin;
exports.getPackageConfig = getPackageConfig;
