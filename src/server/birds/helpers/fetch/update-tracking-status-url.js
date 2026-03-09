import { trackingPost } from './tracking-fetcher.js'

async function setStatusTrackingUrl(bird, trackingId, statusUrl) {
  return await trackingPost(bird, trackingId, '/status-url', { statusUrl })
}

export { setStatusTrackingUrl }
