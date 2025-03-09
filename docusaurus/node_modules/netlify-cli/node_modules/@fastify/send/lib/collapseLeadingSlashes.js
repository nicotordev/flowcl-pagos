'use strict'

/**
 * Collapse all leading slashes into a single slash
 *
 * @param {string} str
 * @private
 */

function collapseLeadingSlashes (str) {
  let i = 0
  for (i; i < str.length; i++) {
    if (str[i] !== '/') {
      break
    }
  }

  return i > 1
    ? '/' + str.substr(i)
    : str
}

module.exports.collapseLeadingSlashes = collapseLeadingSlashes
