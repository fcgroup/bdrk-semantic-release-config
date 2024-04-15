import { existsSync } from 'fs';
import { getPackageConfig, findPlugin } from '../lib/utils.js';
import { config } from '../base/index.js';

function getAssets() {
  const assets = [];

  const packageConf = getPackageConfig();
  if (!packageConf || !packageConf.assets || packageConf.assets.length === 0) {
    return assets;
  }

  const packageAssets = Array.isArray(packageConf.assets) ? packageConf.assets : [];
  packageAssets.filter(asset => !existsSync(asset.path)).forEach(asset =>  {
    console.warn(`Skipping assets: ${JSON.stringify(asset)}`);
  });

  packageAssets.filter(asset => existsSync(asset.path)).forEach(asset => {
    console.debug(`Adding assets: ${JSON.stringify(asset)}`);
    assets.push(asset);
  });

  return assets;
}

// Downstream ESM loader requires default export.
// eslint-disable-next-line import/no-default-export
export default function buildConfig() {
  const pluginName = '@semantic-release/github';
  const githubPlugin = findPlugin(config.plugins, pluginName);
  if (!githubPlugin || githubPlugin.length !== 2) {
    // no configuration - this should not happen as base should set a configuration for this plugin
    return;
  }

  const assets = getAssets();
  githubPlugin[1].assets = [...assets, ...(githubPlugin[1].assets || [])];

  return config;
}
