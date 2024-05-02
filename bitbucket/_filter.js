module.exports = function (config) {
  config.plugins = config.plugins.filter(x => x[0] !== '@semantic-release/github');
  return config;
}
