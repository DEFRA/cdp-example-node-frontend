import { trackingGet } from '~/src/server/birds/helpers/fetch/tracking-fetcher'

async function findTracking(bird, trackingId) {
  const { json } = await trackingGet(bird, trackingId, '')
  return json
}

export { findTracking }
