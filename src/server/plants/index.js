import {
  startController,
  uploadFormController,
  summaryFormController,
  createController,
  plantListController,
  plantController,
  detailsFormController,
  detailsController,
  uploadStatusPollerController
} from './controllers/index.js'
import { provideFormContextValues } from '../common/helpers/form/provide-form-context-values.js'
import { sessionNames } from '../common/constants/session-names.js'

const plants = {
  plugin: {
    name: 'plants',
    register: async (server) => {
      server.ext([
        {
          type: 'onPostHandler',
          method: provideFormContextValues(sessionNames.plants),
          options: {
            before: ['yar'],
            sandbox: 'plugin'
          }
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/plants',
          ...plantListController
        },
        {
          method: 'GET',
          path: '/plants/{plantId}',
          ...plantController
        },
        {
          method: 'GET',
          path: '/plants/add',
          ...startController
        },
        {
          method: 'GET',
          path: '/plants/add/details',
          ...detailsFormController
        },
        {
          method: 'POST',
          path: '/plants/add/details',
          ...detailsController
        },
        {
          method: 'GET',
          path: '/plants/add/upload-pictures',
          ...uploadFormController
        },
        {
          method: 'GET',
          path: '/plants/add/summary',
          ...summaryFormController
        },
        {
          method: 'POST',
          path: '/plants/add/create',
          ...createController
        },
        {
          method: 'GET',
          path: '/plants/add/upload-status-poller',
          ...uploadStatusPollerController
        }
      ])
    }
  }
}

export { plants }
