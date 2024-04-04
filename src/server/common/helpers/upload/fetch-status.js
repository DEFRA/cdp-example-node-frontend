import fetch from 'node-fetch'

import { config } from '~/src/config'

async function fetchStatus(id) {
  const endpointUrl = config.get('cdpUploaderApiUrl') + `/status/${id}`

  const response = await fetch(endpointUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  // TODO handle response errors
  return await response.json()
}

export { fetchStatus }
