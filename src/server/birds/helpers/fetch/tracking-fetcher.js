import { fetcher } from '../../../common/helpers/fetch/fetcher.js'
import { birdPath } from './bird-fetcher.js'

function trackingPath(bird, trackingId, path) {
  return birdPath(bird, `/tracking/${trackingId}${path}`)
}

async function trackingGet(bird, trackingId, path) {
  const endpoint = trackingPath(bird, trackingId, path)
  const { json } = await fetcher(endpoint)
  return json
}

async function trackingPost(bird, trackingId, path, body) {
  const endpoint = trackingPath(bird, trackingId, path)
  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify(body)
  })
  return json
}

export { trackingPath, trackingGet, trackingPost }
