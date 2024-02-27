import path from 'path'
import hapi from '@hapi/hapi'
import { Engine as CatboxRedis } from '@hapi/catbox-redis'

import { config } from '~/src/config'
import { nunjucksConfig } from '~/src/config/nunjucks'
import { router } from './router'
import { requestLogger } from '~/src/server/common/helpers/logging/request-logger'
import { catchAll } from '~/src/server/common/helpers/errors'
import { secureContext } from '~/src/server/common/helpers/secure-context'
import { buildRedisClient } from '~/src/server/common/helpers/redis-client'

const client = buildRedisClient()
const isProduction = config.get('isProduction')

async function createServer() {
  const server = hapi.server({
    port: config.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      },
      files: {
        relativeTo: path.resolve(config.get('root'), '.public')
      },
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: false
        },
        xss: 'enabled',
        noSniff: true,
        xframe: true
      }
    },
    router: {
      stripTrailingSlash: true
    },
    cache: [
      {
        name: 'session',
        engine: new CatboxRedis({
          partition: config.get('redisKeyPrefix'),
          client
        })
      }
    ]
  })

  server.app.cache = server.cache({
    cache: 'session',
    segment: config.get('redisKeyPrefix'),
    expiresIn: config.get('redisTtl')
  })

  if (isProduction) {
    await server.register(secureContext)
  }

  await server.register(requestLogger)

  const appPathPrefix = config.get('appPathPrefix')

  if (!appPathPrefix || appPathPrefix === '/') {
    await server.register(router)
  } else {
    await server.register(router, {
      routes: { prefix: appPathPrefix }
    })
  }

  await server.register(nunjucksConfig)

  server.ext('onPreResponse', catchAll)

  return server
}

export { createServer }
