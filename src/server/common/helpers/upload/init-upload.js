import fetch from 'node-fetch'

import { config } from '~/src/config'

async function initUpload(options = {}) {
  const {
    redirect,
    scanResultCallbackUrl,
    destinationBucket,
    destinationPath,
    acceptedMimeTypes,
    maxFileSize,
    metadata
  } = options

  const endpointUrl = config.get('cdpUploaderUrl') + '/initiate'
  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      redirect,
      scanResultCallbackUrl,
      destinationBucket,
      destinationPath,
      acceptedMimeTypes,
      maxFileSize,
      metadata
    })
  })

  // TODO handle response errors
  return await response.json()
}

export { initUpload }
