import ecsFormat from '@elastic/ecs-pino-format'

import { config } from '~/src/config'
import pino from 'pino'

const isDevelopment = config.get('isDevelopment')
const redactionPaths = [
  'req.headers.authorization',
  'req.headers.cookie',
  'res.headers'
]

if (!isDevelopment) {
  redactionPaths.push('sensitive')
}

if (isDevelopment) {
  redactionPaths.push('req', 'res')
}

const loggerOptions = {
  enabled: !config.get('isTest'),
  redact: {
    paths: redactionPaths,
    remove: true
  },
  level: config.get('logLevel'),
  ...(isDevelopment ? { transport: { target: 'pino-pretty' } } : ecsFormat())
}

const loggerDestination = pino.destination({ fd: 1, sync: false })

export { loggerOptions, loggerDestination }
