import {
  listBirdsController,
  listTrackingController,
  createTrackingController,
  createBirdTrackingController,
  newTrackingController,
  newBirdTrackingController,
  processStatusController,
  showTrackingController,
  showTrackingUploadController,
  trackingUploadedController
} from './controllers/index.js'
import { sessionNames } from '../common/constants/session-names.js'
import { provideFormContextValues } from '../common/helpers/form/provide-form-context-values.js'

const birds = {
  plugin: {
    name: 'birds',
    register: async (server) => {
      server.ext([
        {
          type: 'onPostHandler',
          method: provideFormContextValues(sessionNames.birds),
          options: {
            before: ['yar'],
            sandbox: 'plugin'
          }
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds/{birdId}/tracking/{trackingId}',
          ...showTrackingController
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds/{birdId}/tracking/{trackingId}/process-status',
          ...processStatusController
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds/{birdId}/tracking/{trackingId}/uploaded',
          ...trackingUploadedController
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds/{birdId}/tracking/{trackingId}/upload',
          ...showTrackingUploadController
        }
      ])

      server.route([
        {
          method: 'POST',
          path: '/birds/{birdId}/tracking/spotter',
          ...createBirdTrackingController
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds/{birdId}/tracking/spotter',
          ...newBirdTrackingController
        }
      ])

      server.route([
        {
          method: 'POST',
          path: '/birds/tracking',
          ...createTrackingController
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds/tracking',
          ...newTrackingController
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds/{birdId}',
          ...listTrackingController
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds',
          ...listBirdsController
        }
      ])
    }
  }
}

export { birds }
