const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const overrideTsLoader = require('./react-app-rewire-typescript-hmr');
const rewireCssModules = require('react-app-rewire-css-modules');
const rewireLess = require('react-app-rewire-less');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
  if (env === 'development') {
    // (config, env)
    config = rewireReactHotLoader(config, env);

    // (config, env, babelPlugins = [])
    config = overrideTsLoader(config, env);
  }

  // sass-loader
  config = rewireCssModules(config, env);

  // less-loader
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    // less 구문중에 inline javascript로 처리 되는 구문이 있어 옵션 추가
    // 그렇지 않으면 https://github.com/ant-design/ant-motion/issues/44 이와 같은 오류가 발생됨.
  })(config, env);

  return config;
};
