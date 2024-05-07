import {
  creatureController,
  creatureListController,
  uploadStatusPollerController,
  uploadFormController,
  createController,
  startController,
  summaryFormController
} from '~/src/server/creatures/controllers'
import { provideFormContextValues } from '~/src/server/creatures/helpers/form/provide-form-context-values'

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
          path: '/creatures',
          ...creatureListController
        },
        {
          method: 'GET',
          path: '/creatures/{creatureId}',
          ...creatureController
        },
        {
          method: 'GET',
          path: '/creatures/add',
          ...startController
        },
        {
          method: 'GET',
          path: '/creatures/{creatureId}/upload',
          ...uploadFormController
        },
        {
          method: 'GET',
          path: '/creatures/{creatureId}/upload-status-poller',
          ...uploadStatusPollerController
        },
        {
          method: 'GET',
          path: '/creatures/{creatureId}/summary',
          ...summaryFormController
        },
        {
          method: 'POST',
          path: '/creatures/{creatureId}/create',
          ...createController
        }
      ])
    }
  }
}

export { creatures }
