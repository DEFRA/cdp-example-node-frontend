import { trackingGet } from './tracking-fetcher.js'

async function findTracking(bird, trackingId) {
  const { tracking } = await trackingGet(bird, trackingId, '')
  return tracking
}

export { findTracking }
