const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const path = require('path');
const fs = require('fs');

module.exports = withPlugins(
  [
    [
      withImages,
      {
        inlineImageLimit: 1024,
      },
    ],
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
    [withSass],
    [
      withCSS,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
    ],
  ],
  {
    target: 'serverless',
    webpack(config, options) {
      // get directories in the project
      const dirs = fs.readdirSync(process.cwd(), { withFileTypes: true });
      // add folder alias
      dirs
        .filter(
          dir =>
            dir.isDirectory() &&
            !dir.name.startsWith('.') &&
            !['pages', 'node_modules', 'packages'].includes(dir.name),
        )
        .forEach(dir => {
          config.resolve.alias[dir.name] = path.join(process.cwd(), dir.name);
        });

      config.resolve.alias['@axui'] = path.join(process.cwd(), '/packages');

      // console.log(config.resolve.alias);
      return config;
    },
  },
);
