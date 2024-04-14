import { readFileSync } from 'fs';

function buildConfig() {
  return JSON.parse(readFileSync('../../.releaserc.json', 'utf8'));
}

// Downstream ESM loader requires default export.
// eslint-disable-next-line import/no-default-export
export default buildConfig();
