import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function getPlant(plantId) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + `/plants/${plantId}`

  const { json } = await fetcher(endpoint)

  return json?.plant
}

export { getPlant }
