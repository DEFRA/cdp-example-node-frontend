import { sessionNames } from '../../../common/constants/session-names.js'

async function saveToPlant(request, h, valueObj) {
  const key = sessionNames.plants
  const plants = request.yar.get(key)

  request.yar.set(key, { ...plants, ...valueObj })
  await request.yar.commit(h)

  const plantsSessionObj = request.yar.get(key)

  request.logger.debug({ sensitive: plantsSessionObj }, 'Plant Session info:')

  return plantsSessionObj
}

export { saveToPlant }
