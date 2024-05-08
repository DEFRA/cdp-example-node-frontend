import { birdPost } from '~/src/server/birds/helpers/fetch/bird-fetcher'

async function createTracking(bird, spotter) {
  return await birdPost(bird, '/tracking', { spotter })
}

export { createTracking }
