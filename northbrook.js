require('buba/register')

const northbrook = require('northbrook/plugins').plugin
const mocha = require('@northbrook/mocha').plugin
const buba = require('@northbrook/buba').plugin
const eslint = require('./src').plugin

const config =
  {
    plugins: [
      northbrook,
      mocha,
      buba,
      eslint
    ]
  }

module.exports = config
