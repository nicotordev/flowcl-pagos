'use strict'

const utf8MimeTypeRE = /^text\/|^application\/(javascript|json)/
const isUtf8MimeType = utf8MimeTypeRE.test.bind(utf8MimeTypeRE)

module.exports.isUtf8MimeType = isUtf8MimeType
