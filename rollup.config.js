export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/es/index.js',
      format: 'es'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    }
  }
]