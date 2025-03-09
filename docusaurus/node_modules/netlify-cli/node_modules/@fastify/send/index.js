/*!
 * send
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2014-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const isUtf8MimeType = require('./lib/isUtf8MimeType').isUtf8MimeType
const mime = require('mime')
const SendStream = require('./lib/SendStream')

/**
 * Return a `SendStream` for `req` and `path`.
 *
 * @param {object} req
 * @param {string} path
 * @param {object} [options]
 * @return {SendStream}
 * @public
 */

function send (req, path, options) {
  return new SendStream(req, path, options)
}

/**
 * Module exports.
 * @public
 */

module.exports = send
module.exports.default = send
module.exports.send = send
module.exports.SendStream = SendStream

module.exports.isUtf8MimeType = isUtf8MimeType
module.exports.mime = mime
