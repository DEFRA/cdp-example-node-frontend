import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function deleteCreature(creatureId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') + `/creatures/${creatureId}`
  const { json } = await fetcher(endpoint, {
    method: 'delete'
  })
  return json
}

export { deleteCreature }
