import { v4 as uuidv4 } from 'uuid'
import fetch from 'node-fetch'
import qs from 'qs'

async function initUpload({ yar }, h, options = {}) {
  const {
    successRedirect,
    failureRedirect,
    scanResultCallback,
    fileDestination
  } = options

  const id = uuidv4()
  const queryString = qs.stringify({ id }, { addQueryPrefix: true })

  const response = await fetch('http://localhost:7337/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      successRedirect: successRedirect + queryString,
      failureRedirect: failureRedirect + queryString,
      scanResultCallback: scanResultCallback + queryString,
      fileDestination: fileDestination + queryString
    })
  })

  const json = await response.json()
  // TODO handle response errors

  yar.set(id, json)
  await yar.commit(h)

  return yar.get(id)
}

export { initUpload }
