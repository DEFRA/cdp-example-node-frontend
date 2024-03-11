import path from 'path'

import { config } from '~/src/config'
import { createLogger } from '~/src/server/common/helpers/logging/logger'
import { buildNavigation } from '~/src/config/nunjucks/context/build-navigation'
import { sanitisePath } from 'src/helpers/sanitise-url-path.js'

const logger = createLogger()
const assetPath = config.get('assetPath')

const manifestPath = path.resolve(
  config.get('root'),
  '.public',
  'manifest.json'
)
let webpackManifest

try {
  webpackManifest = require(manifestPath)
} catch (error) {
  logger.error('Webpack Manifest assets file not found')
}

function context(request) {
  return {
    serviceName: config.get('serviceName'),
    breadcrumbs: [],
    navigation: buildNavigation(request),
    getAssetPath: function (asset) {
      return sanitisePath(`${assetPath}/${webpackManifest[asset]}`)
    },
    getServiceUrl: function () {
      return sanitisePath('')
    }
  }
}

export { context }
