const { command, alias, description, each } = require('northbrook')

const { runLint } = require('./runLint')

const plugin =
  command(alias('eslint'), description('Lint your code with ESlint'))

exports.plugin = plugin

each(plugin, runLint).catch(() => process.exit(1))
