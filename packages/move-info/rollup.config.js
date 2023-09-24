const pluginBabel = require('@rollup/plugin-babel');
// const pluginTerser = require('@rollup/plugin-terser');

const plugins = [
  pluginBabel({ babelHelpers: 'bundled' }),
  // pluginTerser(),
];

const baseConfig = {
  input: 'src/index.js',
  plugins,
};

const buildBrowser = [
  {
    ...baseConfig,
    output: {
      file: 'dist/index.mjs',
      format: 'es',
    },
  },
  {
    ...baseConfig,
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
  },
  {
    ...baseConfig,
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'JSUtilsMoveInfo',
    },
  },
];

module.exports = [...buildBrowser];
