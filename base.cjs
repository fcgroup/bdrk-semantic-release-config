const config = require('./.releaserc.json');

for (const plugin of config.plugins) {
  if (plugin[0] === '@semantic-release/npm') {
    plugin[1].npmPublish = false;
  }
}

module.exports = config;
