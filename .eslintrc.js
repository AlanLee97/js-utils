module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['dist/*.js'],
  rules: {
    // 0 - off, 1 - warn, 2 - error
    'import/extensions': 1,
    'no-param-reassign': 1,
    'import/prefer-default-export': 0,
    'global-require': 1,
  },
};
