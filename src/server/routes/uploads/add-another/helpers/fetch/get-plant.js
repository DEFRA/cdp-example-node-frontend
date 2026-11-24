import { config } from '#/config/config.js'
import { fetcher } from '#/server/common/helpers/fetch/fetcher.js'

async function getPlant(plantId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') +
    `/uploads/add-another/plants/${plantId}`

  const { json } = await fetcher(endpoint)

  return json?.plant
}

export { getPlant }
