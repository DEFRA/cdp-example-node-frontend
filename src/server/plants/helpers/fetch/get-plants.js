import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'
import { Plant } from '~/src/server/plants/helpers/models/Plant'

async function getPlants() {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/plants'

  const { json } = await fetcher(endpoint)

  return json.plants.map((plant) => new Plant(plant))
}

export { getPlants }
