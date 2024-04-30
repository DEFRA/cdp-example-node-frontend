// import { trackingGet } from '~/src/server/birds/helpers/fetch/tracking-fetcher'

async function findTrackingLocations(birdId, trackingId) {
  console.log('find tracking locations')
  //   return await trackingGet(birdId, trackingId, '/locations')
  // TODO
  return [
    {
      date: '2021-06-01',
      latitude: 50.774481,
      longitude: -0.904162
    },
    {
      date: '2021-06-02',
      latitude: 51.483817,
      longitude: -0.602926
    }
  ]
}

export { findTrackingLocations }
