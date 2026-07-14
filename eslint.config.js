const bdrk = require('@bdrk/eslint-config');

module.exports = [
  ...bdrk,
  {
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
];
