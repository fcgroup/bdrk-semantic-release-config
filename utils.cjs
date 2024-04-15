import { resolve } from 'path';
import { existsSync } from 'fs';

export function findPlugin(plugins, pluginName) {
  // plugins can be a string (just the name) or a tuple of string and configuration object
  const index = plugins.findIndex(plugin =>
    // eslint-disable-next-line comma-dangle
    Array.isArray(plugin) ? plugin[0] === pluginName : plugin === pluginName
  );

  if (index >= 0) {
    return plugins[index];
  }
}

export function findPackageJson() {
  if (process.env.npm_package_json && existsSync(process.env.npm_package_json)) {
    // from npx
    return process.env.npm_package_json;
  }

  // assume that we are executing in the base of the repo
  const packageJson = resolve(process.env.PWD, 'package.json');
  if (existsSync(packageJson)) {
    return packageJson;
  }
}

export function getPackageConfig() {
  const packageJson = findPackageJson();
  return require(packageJson);
}
