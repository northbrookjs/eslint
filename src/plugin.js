import { command, alias, description, each } from 'northbrook'
import { runLint } from './runLint'

export const plugin =
  command(alias('eslint'), description('Lint your code with ESlint'))

each(plugin, runLint).catch(() => process.exit(1))
