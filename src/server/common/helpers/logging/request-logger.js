import hapiPino from 'hapi-pino'

import {
  loggerDestination,
  loggerOptions
} from '~/src/server/common/helpers/logging/logger-options'

const requestLogger = {
  plugin: hapiPino,
  options: {
    ...loggerOptions,
    stream: loggerDestination
  }
}

export { requestLogger }
