import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'
import { Plant } from '~/src/server/plants/helpers/models/Plant'

async function getPlant(plantId) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + `/plants/${plantId}`

  const { json } = await fetcher(endpoint)

  return new Plant(json?.plant)
}

export { getPlant }
