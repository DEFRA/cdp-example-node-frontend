import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function getPlants() {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/plants'

  const { json } = await fetcher(endpoint)

  return json?.plants ?? []
}

export { getPlants }
