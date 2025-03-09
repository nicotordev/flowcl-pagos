'use strict'

const http = require('http')
const send = require('..')
const path = require('path')

const indexPath = path.join(__dirname, 'index.html')

const server = http.createServer(function onRequest (req, res) {
  send(req, indexPath)
    .pipe(res)
})

server.listen(3000)
