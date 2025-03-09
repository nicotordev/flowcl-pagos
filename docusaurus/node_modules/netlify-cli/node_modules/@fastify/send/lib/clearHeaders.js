/*!
 * send
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2014-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
'use strict'
/**
 * Clear all headers from a response.
 *
 * @param {object} res
 * @private
 */
function clearHeaders (res) {
  const headers = res.getHeaderNames()

  for (let i = 0; i < headers.length; i++) {
    res.removeHeader(headers[i])
  }
}
exports.clearHeaders = clearHeaders
