import { config } from '../../../../config/config.js'
import { fetcher } from '../../../common/helpers/fetch/fetcher.js'

async function createAnimal(animalSession) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/animals'

  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify({
      name: animalSession.name,
      kind: animalSession.kind,
      phoneNumber: animalSession.phoneNumber,
      file: animalSession.file
    })
  })

  return json
}

export { createAnimal }
