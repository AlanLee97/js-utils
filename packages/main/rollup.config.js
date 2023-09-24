const pluginBabel = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
// const pluginTerser = require('@rollup/plugin-terser');

const plugins = [
  pluginBabel({ babelHelpers: 'bundled' }),
  nodeResolve(),
  // pluginTerser(),
];

const baseConfig = {
  input: 'src/index.browser.js',
  plugins,
  // external: ['@alanlee97/utils-browser'],
  output: {
    globals: {
      // '@alanlee97/utils-browser': 'JSUtilsBrowser',
    },
  },
};

const buildBrowser = [
  {
    ...baseConfig,
    output: {
      file: 'dist/index.mjs',
      format: 'es',
      exports: 'named',
      globals: {
        ...baseConfig.output.globals,
      },
    },
  },
  {
    ...baseConfig,
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'named',
      globals: {
        ...baseConfig.output.globals,
      },
    },
  },
  {
    ...baseConfig,
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'JSUtils',
      exports: 'named',
      globals: {
        ...baseConfig.output.globals,
      },
    },
  },
];

// eslint-disable-next-line no-unused-vars
const buildNode = [
  {
    input: 'src/index.node.js',
    output: {
      file: 'node/index.mjs',
      format: 'es',
    },
    plugins,
  },
  {
    input: 'src/index.node.js',
    output: {
      file: 'node/index.cjs',
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
