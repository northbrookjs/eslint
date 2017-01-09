import { EOL } from 'os'
import { join } from 'path'
import { CLIEngine } from 'eslint'
import findup from 'findup-sync'

const ESLINT_CONFIGS = ['.eslintrc', '.eslintrc.json']

export function runLint ({ pkg, config }, io) {
  const { name, path } = pkg

  const eslint = config.eslint || {}

  const globs = eslint.directories || ['src/']

  const patterns = globs.map(glob => join(path, glob))

  const eslintConfig =
    findup(ESLINT_CONFIGS, { cwd: path }) || join(__dirname, '../.eslintrc')

  io.stdout.write(`Running ESlint for ${name}...` + EOL + EOL)

  const { report, formatter } = lint(eslintConfig, patterns, eslint.formatter)

  const formattedReport = formatter(report.results)

  if (formattedReport) {
    io.stderr.write(EOL + formattedReport + EOL)

    return Promise.reject(report)
  }

  io.stdout.write(`Completed ESlint for ${name}` + EOL + EOL)

  return Promise.resolve(report)
}

function lint (configFile, globs, fmt = 'stylish') {
  const cli = new CLIEngine({ configFile })
  const report = cli.executeOnFiles(globs)
  const formatter = cli.getFormatter(fmt)

  return { report, formatter }
}
