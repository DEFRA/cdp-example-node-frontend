import pino from 'pino'

import {
  loggerDestination,
  loggerOptions
} from '~/src/server/common/helpers/logging/logger-options'

function createLogger() {
  return pino(loggerOptions, loggerDestination)
}

export { createLogger }
