import { birdGet } from '~/src/server/birds/helpers/fetch/bird-fetcher'

async function findBirdTrackings(bird) {
  console.log('find trackings')
  return await birdGet(bird, '/trackings')
}

export { findBirdTrackings }
