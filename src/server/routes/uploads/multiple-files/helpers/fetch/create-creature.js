import { config } from '#/config/config.js'
import { fetcher } from '#/server/common/helpers/fetch/fetcher.js'
import { sessionToCreature } from '../../transformers/session-to-creature.js'

async function createCreature(creatureSession) {
  const endpoint =
    config.get('cdpExampleNodeBackendUrl') + '/uploads/multiple-files/creatures'
  const creature = sessionToCreature(creatureSession)

  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify(creature)
  })

  return json
}

export { createCreature }
