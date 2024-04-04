import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function createAnimal(animalSession) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/animals'

  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify({
      name: animalSession.name,
      kind: animalSession.kind,
      phoneNumber: animalSession.phoneNumber,
      fileUrl: animalSession?.uploadStatus?.scanResult?.fileUrl
    })
  })

  return json
}

export { createAnimal }
