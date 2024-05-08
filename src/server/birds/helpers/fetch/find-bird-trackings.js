import { birdGet } from '~/src/server/birds/helpers/fetch/bird-fetcher'

async function findBirdTrackings(bird) {
  return await birdGet(bird, '/trackings')
}

export { findBirdTrackings }
