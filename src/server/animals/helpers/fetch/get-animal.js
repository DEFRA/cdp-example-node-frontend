import { config } from '../../../../config/config.js'
import { fetcher } from '../../../common/helpers/fetch/fetcher.js'

async function getAnimal(animalId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') + `/animals/${animalId}`

  const { json } = await fetcher(endpoint)

  return json
}

export { getAnimal }
