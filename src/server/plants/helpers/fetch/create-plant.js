import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function createPlant(plantSession) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/plants'

  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify({
      plantId: plantSession.plantId,
      name: plantSession.name,
      files: plantSession.files
    })
  })

  return json
}

export { createPlant }
