module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'es'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.common.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'JSUtils'
    }
  }
]