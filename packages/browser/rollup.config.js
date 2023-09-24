const pluginBabel = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
// const pluginTerser = require('@rollup/plugin-terser');

const plugins = [
  pluginBabel({ babelHelpers: 'bundled' }),
  nodeResolve(),
  // pluginTerser(),
];

const baseConfig = {
  input: 'src/index.js',
  plugins,
  // external: ['@alanlee97/utils-move-info'],
  output: {
    globals: {
      // '@alanlee97/utils-move-info': 'JSUtilsMoveInfo',
    },
  },
};

const buildBrowser = [
  {
    ...baseConfig,
    output: {
      file: 'dist/index.mjs',
      format: 'es',
      ...baseConfig.output,
    },
  },
  {
    ...baseConfig,
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      ...baseConfig.output,
    },
  },
  {
    ...baseConfig,
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'JSUtilsBrowser',
      ...baseConfig.output,
    },
  },
];

module.exports = [...buildBrowser];
