import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function getCreature(creatureId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') + `/creatures/${creatureId}`
  const { json } = await fetcher(endpoint)
  return json
}

export { getCreature }
