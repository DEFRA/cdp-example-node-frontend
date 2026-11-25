import { config } from '#/config/config.js'
import { fetcher } from '#/server/common/helpers/fetch/fetcher.js'

async function deleteCreature(creatureId) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') +
    `/uploads/multiple-files/creatures/${creatureId}`
  const { json } = await fetcher(endpoint, {
    method: 'delete'
  })
  return json
}

export { deleteCreature }
