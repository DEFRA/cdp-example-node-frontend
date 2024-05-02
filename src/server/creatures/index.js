import {
  creatureController,
  creatureListController,
  uploadStatusPollerController,
  uploadFormController
} from '~/src/server/creatures/controllers'
import { provideFormContextValues } from '~/src/server/common/helpers/form/provide-form-context-values'
import { sessionNames } from '~/src/server/common/constants/session-names'

const creatures = {
  plugin: {
    name: 'creatures',
    register: async (server) => {
      server.ext([
        {
          type: 'onPostHandler',
          method: provideFormContextValues(sessionNames.creatures),
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
          path: '/creatures/upload',
          ...uploadFormController
        },
        {
          method: 'GET',
          path: '/creatures/{creatureId}/add',
          ...uploadStatusPollerController
        }
      ])
    }
  }
}

export { creatures }
