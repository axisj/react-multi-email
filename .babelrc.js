// const env = require('./env-config.js');

module.exports = {
  presets: [
    'next/babel',
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        targets: 'ie >= 11, cover 99%',
        modules: false,
      },
    ],
    '@zeit/next-typescript/babel',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-runtime'],
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
};
