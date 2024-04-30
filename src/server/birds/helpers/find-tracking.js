import { trackingGet } from '~/src/server/birds/helpers/tracking-fetcher'

async function findTrackingById(birdId, trackingId) {
  console.log('find tracking')
  return await trackingGet(bird, trackingId)
}

export { findTrackingById }
