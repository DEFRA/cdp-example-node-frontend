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
import { provideFormContextValues } from '#/server/common/helpers/form/provide-form-context-values.js'
import { sessionNames } from '#/server/common/constants/session-names.js'

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
          path: '/uploads/add-another',
          ...plantListController
        },
        {
          method: 'GET',
          path: '/uploads/add-another/{plantId}',
          ...plantController
        },
        {
          method: 'GET',
          path: '/uploads/add-another/add',
          ...startController
        },
        {
          method: 'GET',
          path: '/uploads/add-another/add/details',
          ...detailsFormController
        },
        {
          method: 'POST',
          path: '/uploads/add-another/add/details',
          ...detailsController
        },
        {
          method: 'GET',
          path: '/uploads/add-another/add/upload-pictures',
          ...uploadFormController
        },
        {
          method: 'GET',
          path: '/uploads/add-another/add/summary',
          ...summaryFormController
        },
        {
          method: 'POST',
          path: '/uploads/add-another/add/create',
          ...createController
        },
        {
          method: 'GET',
          path: '/uploads/add-another/add/upload-status-poller',
          ...uploadStatusPollerController
        }
      ])
    }
  }
}

export { plants }
