const northbrook = require('northbrook/plugins').plugin
const mocha = require('@northbrook/mocha').plugin
const eslint = require('./src').plugin

const config =
  {
    plugins: [
      northbrook,
      mocha,
      eslint
    ]
  }

module.exports = config
