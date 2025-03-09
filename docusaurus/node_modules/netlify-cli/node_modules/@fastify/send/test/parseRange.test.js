'use strict'

const { test } = require('tap')
const { parseRange } = require('../lib/parseRange')

test('parseRange', function (t) {
  t.plan(13)

  t.test('should return -1 if all specified ranges are invalid', function (t) {
    t.plan(3)
    t.equal(parseRange(200, 'bytes=500-20'), -1)
    t.equal(parseRange(200, 'bytes=500-999'), -1)
    t.equal(parseRange(200, 'bytes=500-999,1000-1499'), -1)
  })

  t.test('should parse str', function (t) {
    t.plan(3)
    const range = parseRange(1000, 'bytes=0-499')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 0, end: 499 })
  })

  t.test('should cap end at size', function (t) {
    t.plan(3)
    const range = parseRange(200, 'bytes=0-499')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 0, end: 199 })
  })

  t.test('should parse str', function (t) {
    t.plan(3)
    const range = parseRange(1000, 'bytes=40-80')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 40, end: 80 })
  })

  t.test('should parse str asking for last n bytes', function (t) {
    t.plan(3)
    const range = parseRange(1000, 'bytes=-400')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 600, end: 999 })
  })

  t.test('should parse str with only start', function (t) {
    t.plan(3)
    const range = parseRange(1000, 'bytes=400-')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 400, end: 999 })
  })

  t.test('should parse "bytes=0-"', function (t) {
    t.plan(3)
    const range = parseRange(1000, 'bytes=0-')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 0, end: 999 })
  })

  t.test('should parse str with no bytes', function (t) {
    t.plan(3)
    const range = parseRange(1000, 'bytes=0-0')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 0, end: 0 })
  })

  t.test('should parse str asking for last byte', function (t) {
    t.plan(3)
    const range = parseRange(1000, 'bytes=-1')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 999, end: 999 })
  })

  t.test('should parse str with some invalid ranges', function (t) {
    t.plan(3)
    const range = parseRange(200, 'bytes=0-499,1000-,500-999')
    t.equal(range.type, 'bytes')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 0, end: 199 })
  })

  t.test('should parse non-byte range', function (t) {
    t.plan(3)
    const range = parseRange(1000, 'items=0-5')
    t.equal(range.type, 'items')
    t.equal(range.length, 1)
    t.strictSame(range[0], { start: 0, end: 5 })
  })

  t.test('should combine overlapping ranges', function (t) {
    t.plan(4)
    const range = parseRange(150, 'bytes=0-4,90-99,5-75,100-199,101-102', { combine: true })
    t.equal(range.type, 'bytes')
    t.equal(range.length, 2)
    t.strictSame(range[0], { start: 0, end: 75 })
    t.strictSame(range[1], { start: 90, end: 149 })
  })

  t.test('should retain original order', function (t) {
    t.plan(5)
    const range = parseRange(150, 'bytes=-1,20-100,0-1,101-120', { combine: true })
    t.equal(range.type, 'bytes')
    t.equal(range.length, 3)
    t.strictSame(range[0], { start: 149, end: 149 })
    t.strictSame(range[1], { start: 20, end: 120 })
    t.strictSame(range[2], { start: 0, end: 1 })
  })
})
