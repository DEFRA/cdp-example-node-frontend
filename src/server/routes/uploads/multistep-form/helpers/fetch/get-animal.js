import { config } from '#/config/config.js'
import { fetcher } from '#/server/common/helpers/fetch/fetcher.js'

async function getAnimal(animalId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') +
    `/uploads/multistep-form/animals/${animalId}`

  const { json } = await fetcher(endpoint)

  return json
}

export { getAnimal }
