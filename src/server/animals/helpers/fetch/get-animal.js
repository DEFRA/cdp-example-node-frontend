import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function getAnimal(animalId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') + `/animals/${animalId}`

  const { json } = await fetcher(endpoint)

  return json
}

export { getAnimal }
