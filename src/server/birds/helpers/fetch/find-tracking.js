import { trackingGet } from '~/src/server/birds/helpers/fetch/tracking-fetcher'

async function findTracking(bird, trackingId) {
  console.log('find tracking')
  const { json } = await trackingGet(bird, trackingId, '')
  return json
}

export { findTracking }
