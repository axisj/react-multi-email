module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { chrome: '55' } /* chrome 55 이상으로 지정 */,
        debug: true,
      },
    ],
    '@babel/preset-react',
  ],
};
