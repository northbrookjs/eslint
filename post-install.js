var path = require('path')
var northbrook = require('northbrook')

const CWD = path.join(__dirname, '../../')
const CONFIG = path.join(CWD, 'northbrook.json')

if (!process.env.CONTINUOUS_INTEGRATION) {
  const pluginName = 'eslint'

  northbrook.modifyConfig(CONFIG, function (config) {
    if (!config) {
      return console.log('Cannot find a ' + CONFIG + ' to append to')
    }

    if (!Array.isArray(config.plugins)) config.plugins = []

    const plugins = config.plugins

    if (plugins.indexOf(pluginName) > -1) return config

    return Object.assign({}, config, {
      plugins: [...plugins, pluginName]
    })
  })
}
