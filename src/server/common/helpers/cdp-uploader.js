import fetch from 'node-fetch'

async function initUpload() {
  const response = await fetch('http://localhost:7337/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      successRedirect: 'http://localhost:3000/creatures/upload/success',
      failureRedirect: 'http://localhost:3000/creatures/upload/failure',
      scanResultCallback: 'http://localhost:3000/',
      fileDestination: 'http://localhost:3000/'
    })
  })

  const json = await response.json()
  // TODO: error handling
  return json
}

export { initUpload }
