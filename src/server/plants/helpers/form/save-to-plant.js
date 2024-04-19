import { config } from '~/src/config'
import { sessionNames } from '~/src/server/common/constants/session-names'

async function saveToPlant(request, h, valueObj) {
  const key = sessionNames.plants
  const plants = request.yar.get(key)

  request.yar.set(key, { ...plants, ...valueObj })
  await request.yar.commit(h)

  const plantsSessionObj = request.yar.get(key)

  if (config.get('isDevelopment')) {
    request.logger.info({ plantsSessionObj }, 'Plant Session info')
  }

  return plantsSessionObj
}

export { saveToPlant }
