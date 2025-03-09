'use strict'

const { test } = require('tap')
const SendStream = require('../index').SendStream

test('constructor', function (t) {
  t.plan(1)

  t.test('SendStream without new returns SendStream instance', function (t) {
    t.plan(1)
    t.ok(SendStream({}, '/', {}) instanceof SendStream)
  })
})
