const pluginBabel = require('@rollup/plugin-babel');

const plugins = [pluginBabel({ babelHelpers: 'bundled' })];
module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
    },
    plugins,
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.common.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'JSUtils',
    },
    plugins,
  },
];
