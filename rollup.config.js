const pluginBabel = require('@rollup/plugin-babel');
const pluginTerser = require('@rollup/plugin-terser');

const plugins = [
  pluginBabel({ babelHelpers: 'bundled' }),
  pluginTerser(),
];
const buildBrowser = [
  {
    input: 'src/index.browser.js',
    output: {
      file: 'browser/index.esm.js',
      format: 'es',
    },
    plugins,
  },
  {
    input: 'src/index.browser.js',
    output: {
      file: 'browser/index.common.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: 'src/index.browser.js',
    output: {
      file: 'browser/index.js',
      format: 'umd',
      name: 'JSUtils',
    },
    plugins,
  },
];

const buildNode = [
  {
    input: 'src/index.node.js',
    output: {
      file: 'node/index.esm.js',
      format: 'es',
    },
    plugins,
  },
  {
    input: 'src/index.node.js',
    output: {
      file: 'node/index.common.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: 'src/index.node.js',
    output: {
      file: 'node/index.js',
      format: 'umd',
      name: 'JSUtils',
    },
    plugins,
  },
];

module.exports = [...buildBrowser, ...buildNode];
