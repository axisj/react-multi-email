const path = require('path');

const tsLoaderMatcher = function(rule) {
  // return rule.loader && rule.loader.indexOf(`ts-loader${path.sep}`) !== -1;
  return rule.test && rule.test.toString() === /\.(ts|tsx)$/.toString();
};

const getLoader = function(rules, matcher) {
  let loader;

  rules.some(rule => {
    return (loader = matcher(rule)
      ? rule
      : getLoader(rule.use || rule.oneOf || [], matcher));
  });

  return loader;
};

const getTsLoader = function(rules) {
  return getLoader(rules, tsLoaderMatcher);
};

module.exports = (config, env, babelPlugins = []) => {
  if (env === 'production') return config;

  const tsLoader = getTsLoader(config.module.rules);
  if (!tsLoader) {
    console.log('ts-loader not found');
    return config;
  }

  if (tsLoader.loader) {
    if (!tsLoader.use) tsLoader.use = [];
    tsLoader.use.push(tsLoader.loader);
    delete tsLoader.loader;
  }

  // Replace loader with array of loaders with  use: []
  tsLoader.use = [
    {
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        plugins: ['react-hot-loader/babel', ...babelPlugins],
      },
    },
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true,
        configFile: 'tsconfig.dev.json',
      },
    },
  ];

  return config;
};
