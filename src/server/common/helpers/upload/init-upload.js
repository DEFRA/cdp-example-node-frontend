import fetch from 'node-fetch'

import { config } from '~/src/config'

async function initUpload(options = {}) {
  const {
    redirect,
    callback,
    s3Bucket,
    s3Path,
    mimeTypes,
    maxFileSize,
    metadata
  } = options

  const endpointUrl = config.get('cdpUploaderUrl') + '/initiate'
  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      redirect,
      callback,
      s3Bucket,
      s3Path,
      mimeTypes,
      maxFileSize,
      metadata
    })
  })

  // TODO handle response errors
  return await response.json()
}

export { initUpload }
