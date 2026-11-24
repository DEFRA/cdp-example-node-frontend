import { config } from '#/config/config.js'
import { fetcher } from '#/server/common/helpers/fetch/fetcher.js'

async function getAnimals() {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/animals'

  const { json } = await fetcher(endpoint)

  return json
}

export { getAnimals }
