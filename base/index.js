import { config } from '../npm/index.js';

// Downstream ESM loader requires default export.
// eslint-disable-next-line import/no-default-export
export default function buildConfig() {
  for (const plugin of config.plugins) {
    if (plugin[0] === '@semantic-release/npm') {
      plugin[1].npmPublish = false;
    }
  }

  return config;
}
