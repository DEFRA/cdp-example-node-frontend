import {
  creatureController,
  creatureListController,
  uploadStatusPollerController,
  uploadFormController,
  createController,
  startController,
  summaryFormController
} from './controllers/index.js'
import { provideFormContextValues } from './helpers/form/provide-form-context-values.js'

const creatures = {
  plugin: {
    name: 'creatures',
    register: async (server) => {
      server.ext([
        {
          type: 'onPostHandler',
          method: provideFormContextValues(),
          options: {
            before: ['yar'],
            sandbox: 'plugin'
          }
        }
      ])
      server.route([
        {
          method: 'GET',
          path: '/uploads/multiple-files',
          ...creatureListController
        },
        {
          method: 'GET',
          path: '/uploads/multiple-files/{creatureId}',
          ...creatureController
        },
        {
          method: 'GET',
          path: '/uploads/multiple-files/add',
          ...startController
        },
        {
          method: 'GET',
          path: '/uploads/multiple-files/{creatureId}/upload',
          ...uploadFormController
        },
        {
          method: 'GET',
          path: '/uploads/multiple-files/{creatureId}/upload-status-poller',
          ...uploadStatusPollerController
        },
        {
          method: 'GET',
          path: '/uploads/multiple-files/{creatureId}/summary',
          ...summaryFormController
        },
        {
          method: 'POST',
          path: '/uploads/multiple-files/{creatureId}/create',
          ...createController
        }
      ])
    }
  }
}

export { creatures }
