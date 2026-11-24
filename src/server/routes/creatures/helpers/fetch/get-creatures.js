import { config } from '#/config/config.js'
import { fetcher } from '#/server/common/helpers/fetch/fetcher.js'

async function getCreatures() {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/creatures'
  const { json } = await fetcher(endpoint)
  return json
}

export { getCreatures }
