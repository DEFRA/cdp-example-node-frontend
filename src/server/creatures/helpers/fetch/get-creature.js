import { config } from '../../../../config/config.js'
import { fetcher } from '../../../common/helpers/fetch/fetcher.js'

async function getCreature(creatureId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') + `/creatures/${creatureId}`
  const { json } = await fetcher(endpoint)
  return json
}

export { getCreature }
