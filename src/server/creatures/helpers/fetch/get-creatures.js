import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function getCreatures() {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/creatures'
  const { json } = await fetcher(endpoint)
  return json
}

export { getCreatures }
