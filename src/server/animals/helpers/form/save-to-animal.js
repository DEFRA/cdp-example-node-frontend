import { sessionNames } from '~/src/server/common/constants/session-names'

async function saveToAnimal(request, h, valueObj) {
  const key = sessionNames.animals
  const animals = request.yar.get(key)

  request.yar.set(key, { ...animals, ...valueObj })
  await request.yar.commit(h)

  const animalsSessionObj = request.yar.get(key)

  request.logger.info({ animalsSessionObj }, 'Animal Session info') // TODO remove

  return animalsSessionObj
}

export { saveToAnimal }
