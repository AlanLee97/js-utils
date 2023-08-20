const rollup = require('rollup');
const config = require('../rollup.config.js');

async function build(config) {
  const bundle = await rollup.rollup(config);
  await bundle.write(config.output);
}

const configList = Array.isArray(config) ? config : [config];

configList.forEach(config => {
  build(config);
})
