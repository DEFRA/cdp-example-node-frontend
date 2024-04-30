import { trackingGet } from '~/src/server/birds/helpers/fetch/tracking-fetcher'

async function findTracking(bird, trackingId) {
  console.log('find tracking')
  return await trackingGet(bird, trackingId, '')
}

export { findTracking }
