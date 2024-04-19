import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function createPlant(plantSession) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/plants'

  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify({
      name: plantSession.name,
      fileUrl: plantSession.fileUrl
    })
  })

  return json
}

export { createPlant }
