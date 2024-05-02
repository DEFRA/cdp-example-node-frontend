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
import { sessionManager } from '~/src/server/common/helpers/session-manager'
import { addFlashMessagesToContext } from '~/src/server/common/helpers/add-flash-messages-to-context'
import { RedisHelper } from '~/src/server/common/helpers/redis-helper'

const redisClient = buildRedisClient()
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
          client: redisClient
        })
      }
    ]
  })

  if (isProduction) {
    await server.register(secureContext)
  }

  const redisHelper = new RedisHelper(redisClient)
  server.decorate('request', 'redis', redisHelper)
  server.decorate('server', 'redis', redisHelper)

  await server.register([requestLogger, sessionManager, router, nunjucksConfig])

  server.ext('onPreResponse', addFlashMessagesToContext, {
    before: ['yar']
  })
  server.ext('onPreResponse', catchAll)

  return server
}

export { createServer }
