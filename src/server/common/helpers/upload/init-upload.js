import fetch from 'node-fetch'

import { config } from '~/src/config'

async function initUpload(options = {}) {
  const {
    successRedirect,
    failureRedirect,
    scanResultCallback,
    destinationBucket,
    acceptedMimeTypes,
    maxFileSize
  } = options

  const endpointUrl = config.get('cdpUploaderUrl') + '/initiate'
  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      successRedirect,
      failureRedirect,
      scanResultCallback,
      destinationBucket,
      acceptedMimeTypes,
      maxFileSize
    })
  })

  // TODO handle response errors
  return await response.json()
}

export { initUpload }
