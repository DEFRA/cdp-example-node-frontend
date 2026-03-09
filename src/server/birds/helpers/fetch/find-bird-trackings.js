import { birdGet } from './bird-fetcher.js'

async function findBirdTrackings(bird) {
  return await birdGet(bird, '/trackings')
}

export { findBirdTrackings }
