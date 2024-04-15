import { readFileSync } from 'fs';

// Downstream ESM loader requires default export.
// eslint-disable-next-line import/no-default-export
export default function buildConfig() {
  return JSON.parse(readFileSync('../../.releaserc.json', 'utf8'));
}
