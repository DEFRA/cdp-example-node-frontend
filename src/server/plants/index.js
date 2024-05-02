import {
  startController,
  uploadFormController,
  summaryFormController,
  createController,
  plantListController,
  plantController,
  detailsFormController,
  detailsController,
  uploadStatusPollerController,
  callbackController
} from '~/src/server/plants/controllers'
import { provideFormContextValues } from '~/src/server/common/helpers/form/provide-form-context-values'
import { sessionNames } from '~/src/server/common/constants/session-names'

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
          method: 'POST',
          path: '/plants/callback/{plantId}',
          ...callbackController
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
