import { config } from '#/config/config.js'
import { fetcher } from '#/server/common/helpers/fetch/fetcher.js'

async function getPlants() {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') + '/uploads/add-another/plants'

  const { json } = await fetcher(endpoint)

  return json?.plants ?? []
}

export { getPlants }
