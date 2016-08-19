const { join } = require('path')
const { CLIEngine } = require('eslint')
const findConfig = require('find-config')

const { logSeparator } = require('northbrook/lib/util')

exports.plugin = eslint

// export so other tools can reuse this function
exports.lint = lint

function eslint (program, config, workingDir) {
  program.command('eslint')
  .description('Use eslint to lint your source code')
  .action(function () {
    config.packages.forEach(function (packageName) {
      const packageDir = join(workingDir, packageName)
      const name = require(join(packageDir, 'package.json')).name

      const eslintConfig =
        findConfig('.eslintrc', { home: false, cwd: packageDir }) ||
        join(__dirname, 'eslintrc.json')

      const globs = getGlobs(get(config)) || ['src/']

      const patterns = globs.map(glob => join(packageName, glob))

      const formatter = get(config).formatter || 'stylish'

      logSeparator(name)
      lint(eslintConfig, patterns, formatter)
      logSeparator()
    })
  })
}

function lint (configFile, globs, fmt = 'stylish') {
  const cli = new CLIEngine({configFile})
  const report = cli.executeOnFiles(globs)
  const formatter = cli.getFormatter(fmt)
  console.log(formatter(report.results) || '    No errors found!')
  return report // could be useful to other tools
}

const get = config => config && config.eslint
const getGlobs = config => Array.isArray(config.directories) && config.directories
