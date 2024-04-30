import { birdPost } from '~/src/server/birds/helpers/bird-fetcher'

async function createTracking(bird, spotter) {
  console.log('Save tracking')
  return await birdPost(bird, '/tracking', { spotter })
}

export { createTracking }