import { trackingPost } from '~/src/server/birds/helpers/fetch/tracking-fetcher'

async function setStatusTrackingUrl(bird, trackingId, statusUrl) {
  console.log('Update tracking status')
  return await trackingPost(bird, trackingId, '/status-url', { statusUrl })
}

export { setStatusTrackingUrl }
