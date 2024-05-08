import { trackingGet } from '~/src/server/birds/helpers/fetch/tracking-fetcher'

async function findTracking(bird, trackingId) {
  const { tracking } = await trackingGet(bird, trackingId, '')
  return tracking
}

export { findTracking }
