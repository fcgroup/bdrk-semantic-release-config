const fs = require('fs');
const { getPackageConfig, findPlugin } = require('./utils.js');

const config = require('./base.js');

function getAssets() {
  const assets = [];

  const packageConf = getPackageConfig();
  if (!packageConf || !packageConf.assets || packageConf.assets.length === 0) {
    return assets;
  }

  const packageAssets = Array.isArray(packageConf.assets) ? packageConf.assets : [];
  packageAssets.filter(asset => !fs.existsSync(asset.path)).forEach(asset =>  {
    console.warn(`Skipping assets: ${JSON.stringify(asset)}`);
  });

  packageAssets.filter(asset => fs.existsSync(asset.path)).forEach(asset => {
    console.debug(`Adding assets: ${JSON.stringify(asset)}`);
    assets.push(asset);
  });

  return assets;
}

function updateConfig(configuration) {
  const pluginName = '@semantic-release/github';
  const githubPlugin = findPlugin(configuration.plugins, pluginName);
  if (!githubPlugin || githubPlugin.length !== 2) {
    // no configuration - this should not happen as base should set a configuration for this plugin
    return;
  }

  const assets = getAssets();
  githubPlugin[1].assets = [...assets, ...(githubPlugin[1].assets || [])];
}

updateConfig(config);
module.exports = config;
