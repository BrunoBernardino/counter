const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  target: 'serverless',
  sassLoaderOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.resolve.alias.pages = path.join(__dirname, 'pages');
    config.resolve.alias.components = path.join(__dirname, 'components');
    config.resolve.alias.modules = path.join(__dirname, 'modules');
    config.resolve.alias.hocs = path.join(__dirname, 'hocs');
    config.resolve.alias.lib = path.join(__dirname, 'lib');
    config.resolve.alias.styles = path.join(__dirname, 'styles');
    return config;
  },
});
