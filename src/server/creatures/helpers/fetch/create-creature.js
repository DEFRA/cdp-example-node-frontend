import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'
import { sessionToCreature } from '~/src/server/creatures/transformers/session-to-creature'

async function createCreature(creatureSession) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/creatures'
  const creature = sessionToCreature(creatureSession)

  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify(creature)
  })

  return json
}

export { createCreature }
