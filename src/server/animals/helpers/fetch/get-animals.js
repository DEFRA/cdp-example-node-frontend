import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function getAnimals() {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/animals'

  const { json } = await fetcher(endpoint)

  return json
}

export { getAnimals }
