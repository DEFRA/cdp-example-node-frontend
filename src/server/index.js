import path from 'node:path'
import hapi from '@hapi/hapi'
import { Engine as CatboxRedis } from '@hapi/catbox-redis'

import { config } from '~/src/config'
import { nunjucksConfig } from '~/src/config/nunjucks'
import { router } from './router'
import { requestLogger } from '~/src/server/common/helpers/logging/request-logger'
import { catchAll } from '~/src/server/common/helpers/errors'
import { secureContext } from '~/src/server/common/helpers/secure-context'
import { buildRedisClient } from '~/src/server/common/helpers/redis/redis-client'
import { sessionManager } from '~/src/server/common/helpers/session-manager'
import { addFlashMessagesToContext } from '~/src/server/common/helpers/add-flash-messages-to-context'
import { csrf } from '~/src/server/common/helpers/csrf'
import { redis } from '~/src/server/common/helpers/redis/redis'
import { pulse } from '~/src/server/common/helpers/pulse'

const isProduction = config.get('isProduction')

async function createServer() {
  const redisClient = await buildRedisClient(config.get('redis'))

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

  server.decorate('server', 'redisClient', redisClient)

  await server.register([
    requestLogger,
    pulse,
    redis,
    sessionManager,
    router,
    nunjucksConfig,
    csrf
  ])

  server.ext('onPreResponse', addFlashMessagesToContext, {
    before: ['yar']
  })
  server.ext('onPreResponse', catchAll)

  redisClient.set('test-key', `hello from redis ${new Date().toISOString()}`)
  server.logger.info(
    `Redis read/write test: ${await redisClient.get('test-key')}`
  )

  return server
}

export { createServer }
