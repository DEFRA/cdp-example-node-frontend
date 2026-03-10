import { config } from '../../../../config/config.js'
import { fetcher } from '../../../common/helpers/fetch/fetcher.js'

async function getPlants() {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/plants'

  const { json } = await fetcher(endpoint)

  return json?.plants ?? []
}

export { getPlants }
