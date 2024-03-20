import fetch from 'node-fetch'

async function initUpload({ yar }, h, options = {}) {
  const {
    successRedirect,
    failureRedirect,
    scanResultCallback,
    fileDestination
  } = options

  const response = await fetch('http://localhost:7337/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      successRedirect,
      failureRedirect,
      scanResultCallback,
      fileDestination
    })
  })

  // TODO handle response errors
  return await response.json()
}

export { initUpload }
