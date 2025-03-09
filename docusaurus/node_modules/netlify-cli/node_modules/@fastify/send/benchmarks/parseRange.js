'use strict'

const benchmark = require('benchmark')
const { parseRange } = require('../lib/parseRange')

const size = 150
const range = 'bytes=0-4,90-99,5-75,100-199,101-102'

new benchmark.Suite()
  .add('parseRange', function () { parseRange(size, range) }, { minSamples: 100 })
  .on('cycle', function onCycle (event) { console.log(String(event.target)) })
  .run({ async: false })
