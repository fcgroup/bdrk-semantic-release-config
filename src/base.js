import { config } from './npm.js';

function buildConfig(configuration) {
  for (const plugin of configuration.plugins) {
    if (plugin[0] === '@semantic-release/npm') {
      plugin[1].npmPublish = false;
    }
  }

  return configuration;
}

// Downstream ESM loader requires default export.
// eslint-disable-next-line import/no-default-export
export default buildConfig(config);
