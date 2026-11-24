import { birdPost } from './bird-fetcher.js'

async function createTracking(bird, spotter) {
  return await birdPost(bird, '/tracking', { spotter })
}

export { createTracking }
