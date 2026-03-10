import { sessionNames } from '../../../common/constants/session-names.js'

async function saveToPlant(request, h, valueObj) {
  const key = sessionNames.plants
  const plants = request.yar.get(key)
  const plantsSessionObj = { ...plants, ...valueObj }

  request.yar.set(key, plantsSessionObj)
  await request.yar.commit(h)

  request.logger.debug({ sensitive: plantsSessionObj }, 'Plant Session info:')

  return plantsSessionObj
}

export { saveToPlant }
