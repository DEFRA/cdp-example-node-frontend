import { config } from '../../../../config/config.js'
import { fetcher } from '../../../common/helpers/fetch/fetcher.js'

async function deleteCreature(creatureId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') + `/creatures/${creatureId}`
  const { json } = await fetcher(endpoint, {
    method: 'delete'
  })
  return json
}

export { deleteCreature }
