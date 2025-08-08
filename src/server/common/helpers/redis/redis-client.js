import { Cluster, Redis } from 'ioredis'
import { createLogger } from '~/src/server/common/helpers/logging/logger'
import { generateAuthToken } from '~/src/server/common/helpers/redis/iam'

/**
 * Setup Redis and provide a redis client
 *
 * Local development - 1 Redis instance
 * Environments - Elasticache / Redis Cluster with username and password
 */
export function buildRedisClient(redisConfig) {
  const logger = createLogger()

  let redisClient = buildClient(redisConfig)

  redisClient.on('connect', () => {
    logger.info('Connected to Redis server')
  })

  redisClient.on('error', (error) => {
    logger.error(`Redis connection error ${error}`)
  })

  redisClient.on('end', async () => {
    logger.warn('Redis connection ended. Reconnecting...')
    try {
      redisClient.disconnect()
      redisClient = await buildClient()
    } catch (e) {
      logger.error('Failed to reconnect:', e)
    }
  })

  return redisClient
}

async function buildClient(redisConfig) {
  const port = 6379
  const db = 0
  const keyPrefix = redisConfig.keyPrefix
  const host = redisConfig.host
  let redisClient

  const credentials =
    redisConfig.username === ''
      ? {}
      : {
          username: redisConfig.username,
          password: await generateAuthToken({ region: 'eu-west-2', host })
        }
  const tls = redisConfig.useTLS ? { tls: {} } : {}

  if (redisConfig.useSingleInstanceCache) {
    redisClient = new Redis({
      port,
      host,
      db,
      keyPrefix,
      ...credentials,
      ...tls
    })
  } else {
    redisClient = new Cluster(
      [
        {
          host,
          port
        }
      ],
      {
        keyPrefix,
        slotsRefreshTimeout: 10000,
        lazyConnect: true,
        clusterRetryStrategy: (times) => Math.min(times * 1000, 30000),
        dnsLookup: (address, callback) => callback(null, address),
        redisOptions: {
          db,
          ...credentials,
          ...tls
        }
      }
    )
  }

  return redisClient
}
