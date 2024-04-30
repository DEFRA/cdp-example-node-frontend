import { trackingPost } from '~/src/server/birds/helpers/tracking-fetcher'

async function setStatusTrackingUrl(bird, trackingId, statusUrl) {
  console.log('Update tracking status')
  return await trackingPost(bird, trackingId, '/statusUrl', { statusUrl })
}

export { setStatusTrackingUrl }
